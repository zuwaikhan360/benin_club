import type { NextApiRequest, NextApiResponse } from "next";
import Flutterwave from "flutterwave-node-v3";
import Wallet, { WalletDocument } from "@/models/wallet.model";
import Transaction, { TransactionDocument } from "@/models/transaction.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { connectDB } from "@/utils/mongoose";

// Configure Flutterwave SDK with your API keys
const flutterwave = new (Flutterwave as any)(
  process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);

export default async function handleFund(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: "You must log in to access this resource." });

  const { user: loginUser } = session;

  const { transactionId } = req.body;
  const userId = loginUser._id;

  try {
    await connectDB();
    // Verify payment with Flutterwave
    const payment = await flutterwave.Transaction.verify({
      id: transactionId.toString(),
    });
    console.log(payment);

    // If payment is successful, update the user's wallet balance and create a transaction record
    if (payment.data.status === "successful") {
      const amount = payment.data.amount;
      const wallet: WalletDocument | null = await Wallet.findOne({
        userId: userId,
      });
      if (wallet) {
        wallet.balance += amount;
        await wallet.save();

        // Create a new transaction record
        const transaction: TransactionDocument = new Transaction({
          userId: userId,
          type: "credit",
          amount: amount,
          reference: payment.data.flw_ref,
          status: "Completed",
          description: "Fund wallet",
          paymentMethod: "flutterwave",
          for: "wallet",
          bal: wallet.balance,
          initiatedBy: userId,
        });
        await transaction.save();

        // Return success message
        return res.status(200).json({
          message: "Payment successful",
        });
      } else {
        // If the user does not have a wallet, create one and update the balance
        const newWallet = new Wallet({
          userId: userId,
          balance: amount,
        });

        await newWallet.save();

        // Create a new transaction record
        const transaction: TransactionDocument = new Transaction({
          userId: userId,
          type: "credit",
          amount: amount,
          reference: payment.data.flw_ref,
          status: "Completed",
          description: "Fund wallet",
          paymentMethod: "flutterwave",
          initiatedBy: userId,
          for: "wallet",
          bal: newWallet.balance,
        });
        await transaction.save();

        // Return success message
        return res.status(200).json({
          message: "Payment successful",
        });
      }
    } else {
      // If payment is not successful, create a failed transaction record and return error message
      const transaction: TransactionDocument = new Transaction({
        userId: userId,
        type: "credit",
        amount: payment.amount,
        reference: payment.data.flw_ref,
        status: "Failed",
        description: "Fund wallet",
        paymentMethod: "flutterwave",
        for: "wallet",
        initiatedBy: userId,
      });
      await transaction.save();

      return res.status(400).json({
        message: "Payment failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while processing your payment",
    });
  }
}
