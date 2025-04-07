import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user.model";
import { connectDB } from "@/utils/mongoose";

export default async function verifyToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.query;
  await connectDB();
  try {
    const user = await User.findOne({
      "verificationToken.token": token,
      "verificationToken.expires": { $gt: Date.now() },
    });
    if (user && user.signupStep === "EmailVerification") {
      user.signupStep === "VerifyingEmail";
      await user.save();
    }
    res.status(200).json({ isValidToken: Boolean(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
