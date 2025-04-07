import type { NextApiRequest, NextApiResponse } from "next";
import Wallet from "@/models/wallet.model";
import Transaction from "@/models/transaction.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handlePay(
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

  if (loginUser.role !== "admin" && loginUser.role !== "wallet") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { amount, description } = req.body;
  const { id: userId } = req.query;

  try {
    // Find the user's wallet
    const wallet = await Wallet.findOne({ userId: userId });

    // If the user has enough balance, deduct the amount and create a transaction
    if (wallet) {
      wallet.balance -= parseInt(amount);
      await wallet.save();

      // Create a transaction record
      const transaction = new Transaction({
        userId,
        type: "debit",
        amount: parseInt(amount),
        reference: "",
        status: "Completed",
        description,
        paymentMethod: "Wallet",
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
      // If the user does not have enough balance, return error message
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while processing your payment",
    });
  }
}
