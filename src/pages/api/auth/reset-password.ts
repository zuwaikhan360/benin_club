import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/utils/auth";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body;
  const { token } = req.query;

  if (!password) {
    return res.status(422).json({ message: "Missing password field" });
  }

  try {
    await connectDB();

    const hashedPassword = await hashPassword(password);

    const user = await User.findOne({
      "verificationToken.token": token,
      "verificationToken.expires": { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = hashedPassword;
    user.verificationToken = null;
    if (user.signupStep === "EmailVerification") user.signupStep = "Payment";
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
