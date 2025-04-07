import { NextApiRequest, NextApiResponse } from "next";
import { randomBytes } from "crypto";
import { promisify } from "util";
import sendEmail from "@/utils/sendEmail";
import User from "@/models/user.model";
import { connectDB } from "@/utils/mongoose";

const randomBytesAsync = promisify(randomBytes);

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  // Validate the email address
  if (!email) {
    return res.status(400).json({ message: "Email address is required" });
  }

  try {
    await connectDB();

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.verificationToken) {
        if (existingUser.verificationToken.expires <= Date.now()) {
          // If the token has expired, delete it and create a new one
          existingUser.verificationToken = null;
        } else {
          return res.status(500).json({
            message: "Please verify your email address to continue.",
          });
        }
      } else {
        return res
          .status(409)
          .json({ message: "A user with this email already exists" });
      }
    }

    // Generate a verification code
    const code = (await randomBytesAsync(16)).toString("hex");

    // Create a new user with the provided email and the verification code
    const verificationToken = {
      token: code,
      expires: Date.now() + 10 * 60 * 60 * 1000, // Expires in 10 hour
    };

    // If a user with this email already exists, update their verification token
    if (existingUser) {
      existingUser.verificationToken = verificationToken;
      await existingUser.save();
    }
    // Otherwise, create a new user with the provided email and the verification token
    else {
      const newUser = new User({
        email,
        verificationToken,
        signupStep: "EmailVerification",
      });
      await newUser.save();
    }

    // Send an email to the user with instructions on how to complete the verification process
    const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${code}`;
    const message = `Please click the following link to verify your email address: ${verifyUrl}`;
    await sendEmail(email, "Verify your email address", message);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("error", error);
    return res
      .status(500)
      .json({ message: "Error sending verification email" });
  }
}
