import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import Wallet, { WalletDocument } from "@/models/wallet.model";
import { UserDocument } from "@/models/user.model";

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

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    await connectDB();

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (page - 1) * pageSize;
    const search = (req.query.search as string) || "";

    const wallets = await Wallet.find()
      .skip(skip)
      .limit(pageSize)
      .populate<UserDocument>({
        path: "userId",
        select: "firstName surName",
      });

    const wallets1 = await Wallet.find().populate<UserDocument>({
      path: "userId",
      select: "firstName surName",
    });

    const filteredWalletData1 = wallets1.filter(
      (member) =>
        member.userId?.firstName.toLowerCase().includes(search.toLowerCase()) ||
        member.userId?.surName.toLowerCase().includes(search.toLowerCase())
    );
    const totalWallets: number = filteredWalletData1.length;

    res.status(200).json({
      filteredWalletData: search ? filteredWalletData1 : wallets,
      totalWallets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
