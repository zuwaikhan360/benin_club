import Newsletter from "@/models/newsletter.model";
import User, { IUser } from "@/models/user.model";
import { connectDB } from "@/utils/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    // Create a new newsletter subscription
    const { email } = req.body;
    const user: IUser | null = await User.findOne({ email });
    const isMember = Boolean(user);
    const newsletter = new Newsletter({ email, isMember });
    await newsletter.save();
    res.status(201).json(newsletter);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
}
