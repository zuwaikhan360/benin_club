import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/mongoose";
import Transaction, {
  ITransaction,
  TransactionDocument,
} from "@/models/transaction.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import User from "@/models/user.model";
import Wallet, { WalletDocument } from "@/models/wallet.model";
import Cors from "cors";
import TransactionTest from "@/models/transaction.model.text";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors);

    switch (req.method) {
      case "GET":
        const session = await getServerSession(req, res, authOptions);

        if (!session)
          return res
            .status(401)
            .json({ message: "You must log in to access this resource." });

        const { user: loginUser } = session;
        if (loginUser.role !== "admin" && loginUser.role !== "wallet") {
          return res.status(401).json({ message: "Unauthorized" });
        }
        await connectDB();
        if (req.query.status) {
          const transactions: TransactionDocument[] = await Transaction.find()
            .sort({ createdAt: -1 })
            .populate({
              path: "userId",
              select: "surName firstName",
            });

          res.status(200).json(transactions);
        } else {
          const transactions: TransactionDocument[] = await Transaction.find();
          res.status(200).json(transactions);
        }
        break;
      case "POST":
        if (req.body.accessToken !== "JqwiG9RpjDbYSiC") {
          return res.status(401).json({ message: "Unauthorized" });
        }
        await connectDB();

        if (!req.body || typeof req.body !== "object") {
          return res.status(400).json({ message: "Invalid request body" });
        }

        const { description, amount, memberId } = req.body;

        // Validate the transaction data
        const errors: string[] = [];

        if (!description) {
          errors.push("Description is required.");
        }

        if (!amount || typeof amount !== "number" || amount <= 0) {
          errors.push("Amount should be a positive number.");
        }

        if (!memberId) {
          errors.push("member ID is required.");
        }

        const member = await User.findOne({ memberId });
        if (!member) {
          errors.push("Invalid member ID");
        }

        if (errors.length > 0) {
          return res.status(400).json({ message: "Validation error", errors });
        }

        const wallet = await Wallet.findOneAndUpdate(
          { userId: member._id },
          { $inc: { balance: 0 } },
          { upsert: true, new: true }
        ).exec();

        console.log(wallet);

        const transaction = new TransactionTest({
          description,
          amount,
          status: "Pending",
          userId: member._id,
          paymentMethod: "Wallet",
          type: "debit",
          for: "wallet",
          reference: "",
          initiatedBy: "64f8645fcdad483e0c866ad8",
          createdAt: new Date(),
          bal: wallet.balance,
        });

        await transaction.save();

        res.status(201).json({
          success: true,
          message: "this is a test transaction",
          transaction,
        });

        break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
