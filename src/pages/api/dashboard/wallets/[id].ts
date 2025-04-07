import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import Wallet, { WalletDocument } from "@/models/wallet.model";
import Transaction, { TransactionDocument } from "@/models/transaction.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: "You must log in to access this resource." });

    const { user } = session;

    if (user.role !== "admin" && user.role !== "wallet") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await connectDB();

    switch (req.method) {
      case "GET":
        const wallet: WalletDocument | null = await Wallet.findById(
          req.query.id
        );
        if (!wallet) {
          res.status(404).json({ message: "Wallet not found" });
        } else {
          res.status(200).json(wallet);
        }

        break;
      case "POST":
        const { id: userId } = req.query;
        const { amount } = req.body;
        const walletCheck: WalletDocument | null = await Wallet.findOne({
          userId,
        });

        if (!walletCheck) {
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
            description: "Wallet created",
            paymentMethod: "Admin",
            initiatedBy: user._id,
            for: "wallet",
            bal: newWallet.balance,
          });
          await transaction.save();

          // Return success message
          return res.status(200).json({
            message: "Payment successful",
          });
        } else {
          res
            .status(405)
            .json({ message: "Wallet already created for this user" });
        }
        break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
