import type { NextApiRequest, NextApiResponse } from "next";
import Wallet, { WalletDocument } from "@/models/wallet.model";
import Transaction, { TransactionDocument } from "@/models/transaction.model";
import { getServerSession } from "next-auth";
import { connectDB } from "@/utils/mongoose";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handleFund(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: "You must log in to access this resource." });

    const { user: loginUser } = session;

    if (loginUser.role !== "admin" && loginUser.role !== "wallet") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { amount, paymentMethod } = req.body;
    const { id: userId } = req.query;

    await connectDB();

    const wallet: WalletDocument | null = await Wallet.findOne({ userId });

    if (wallet) {
      wallet.balance += parseInt(amount);
      await wallet.save();

      // Create a new transaction record
      const transaction: TransactionDocument = new Transaction({
        userId: userId,
        type: "credit",
        amount: parseInt(amount),
        reference: "",
        status: "Completed",
        description: "Fund wallet",
        paymentMethod,
        initiatedBy: loginUser._id,
        for: "wallet",
        bal: wallet.balance,
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
        balance: parseInt(amount),
      });

      await newWallet.save();

      // Create a new transaction record
      const transaction: TransactionDocument = new Transaction({
        userId: userId,
        type: "credit",
        amount: parseInt(amount),
        reference: "",
        status: "Completed",
        description: "Fund wallet",
        paymentMethod,
        initiatedBy: loginUser._id,
        for: "wallet",
        bal: newWallet.balance,
      });
      await transaction.save();

      // Return success message
      return res.status(200).json({
        message: "Payment successful",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while processing your payment",
    });
  }
}
