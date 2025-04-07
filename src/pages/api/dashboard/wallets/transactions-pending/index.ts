import type { NextApiRequest, NextApiResponse } from "next";
import Transaction from "@/models/transaction.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";
import { connectDB } from "@/utils/mongoose";
import { UserDocument } from "@/models/user.model";

export default async function handleGetTransactions(
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

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    // Find all pending transactions for the given user
    const transactions = await Transaction.find({
      for: "wallet",
      status: "Pending",
    })
      .sort({ createdAt: -1 })
      .populate<UserDocument>({
        path: "userId",
        select: "firstName surName",
      });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while retrieving transactions",
    });
  }
}
