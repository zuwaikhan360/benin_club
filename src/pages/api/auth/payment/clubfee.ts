import { NextApiRequest, NextApiResponse } from "next";
import Flutterwave from "flutterwave-node-v3";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]";
import User, { IUser } from "@/models/user.model";
import { connectDB } from "@/utils/mongoose";
import Transaction, { TransactionDocument } from "@/models/transaction.model";
import sendEmail from "@/utils/sendEmail";
import { usersAdminEmails } from "@/constants/emails";

// Configure Flutterwave SDK with your API keys
const flutterwave = new (Flutterwave as any)(
  process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
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

    // If payment is successful, update the user's wallet balance and create a transaction record
    if (payment.data.status === "successful") {
      const amount = payment.data.amount;

      // Create a new transaction record
      const transaction: TransactionDocument = new Transaction({
        userId: userId,
        type: "debit",
        amount: amount,
        reference: payment.data.flw_ref,
        status: "Completed",
        description: "Club enter fee payment",
        paymentMethod: "flutterwave",
        for: "wallet",
        initiatedBy: userId,
      });
      await transaction.save();

      const user: IUser | null = await User.findOne({
        email: session.user.email,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      user.signupStep = "ConfirmPayment";
      user.save();

      const message =
        "We hope this message finds you well. We are delighted to inform you that your recent club fee payment has been successfully processed. Thank you for your prompt action in completing this important step to maintain your membership with Benin";
      sendEmail(user.email, "Club Fee Payment", message);

      const message1 = `New club fee payment by ${user.firstName} ${user.surName}`;
      for (let i = 0; i < usersAdminEmails.length; i++) {
        sendEmail(usersAdminEmails[i], "Club Fee Payment", message1);
      }
      // Return success message
      return res.status(200).json({
        message: "Payment successful",
      });
    } else {
      // If payment is not successful, create a failed transaction record and return error message
      const transaction: TransactionDocument = new Transaction({
        userId: userId,
        type: "debit",
        amount: payment.amount,
        reference: payment.data.flw_ref,
        status: "Failed",
        description: "Form payment",
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
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
