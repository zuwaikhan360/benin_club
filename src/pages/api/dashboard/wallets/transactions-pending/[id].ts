import type { NextApiRequest, NextApiResponse } from "next";
import Transaction, { ITransaction } from "@/models/transaction.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";
import { connectDB } from "@/utils/mongoose";
import { UserDocument } from "@/models/user.model";
import TransactionTest from "@/models/transaction.model.text";
import Wallet, { WalletDocument } from "@/models/wallet.model";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: "You must log in to access this resource." });

  const { user } = session;

  if (user.role !== "admin" && user.role !== "wallet") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { id } = req.query;
    const { status } = req.body;

    // Find all pending transactions for the given user
    const transaction: ITransaction | null = await TransactionTest.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    const wallet: WalletDocument | null = await Wallet.findOne({
      userId: transaction.userId,
    });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    // wallet.balance += transaction.amount;

    transaction.status = status;

    await wallet.save();
    await transaction.save();

    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while retrieving transactions",
    });
  }
}
