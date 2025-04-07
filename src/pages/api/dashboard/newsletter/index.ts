import Newsletter from "@/models/newsletter.model";
import User, { IUser } from "@/models/user.model";
import { connectDB } from "@/utils/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: "You must log in to access this resource." });

    const { user: loginUser } = session;

    if (loginUser.role !== "admin" && loginUser.role !== "user") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await connectDB();

    switch (method) {
      case "GET":
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;
        const skip = (page - 1) * pageSize;
        const search = (req.query.search as string) || "";

        // Retrieve all newsletter subscriptions
        const newsletters = await Newsletter.find({ email: { $regex: search } })
          .skip(skip)
          .limit(pageSize);
        const totalEmails: number = await Newsletter.countDocuments({
          email: { $regex: search },
        });

        res.status(200).json({ newsletters, totalEmails });
        break;

      case "POST":
        // Create a new newsletter subscription
        const { email } = req.body;
        const userExist: IUser | null = await User.findOne({ email });
        const isMember = userExist ? true : false;
        const newsletter = new Newsletter({ email, isMember });
        await newsletter.save();
        res.status(201).json(newsletter);

        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
