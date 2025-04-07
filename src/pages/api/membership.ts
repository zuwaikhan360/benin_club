import { FormData } from "@/types/signup";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { connectDB } from "@/utils/mongoose";
import User, { IUser } from "@/models/user.model";
import { usersAdminEmails } from "@/constants/emails";
import sendEmail from "@/utils/sendEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: "You must log in to access this resource." });

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).select(
      "-password -_id"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    switch (req.method) {
      case "GET":
        return res.status(200).json(user);

      case "POST":
        const currentUser = await User.findOne({
          email: session.user.email,
        });

        currentUser.signupStep = "Verification";
        await currentUser.save();

        const message1 = `User details Verification require for ${user.firstName} ${user.surName}`;
        for (let i = 0; i < usersAdminEmails.length; i++) {
          sendEmail(usersAdminEmails[i], "Verification", message1);
        }

        return res.status(200).json({ message: "User created successfully." });

      case "PUT":
        const formData: FormData = req.body;

        const currentUser2 = await User.findOne({
          email: session.user.email,
        }).select(
          "-password -memberId -subcriptionFee -subcriptionBal -entryFeePayment -entryFeeBal -status -level -joinDate -password -position -verificationToken -role -signupStep -wallet "
        );

        const disallowedKeys = [
          "memberId",
          "subcriptionFee",
          "subcriptionBal",
          "entryFeePayment",
          "entryFeeBal",
          "status",
          "level",
          "joinDate",
          "password",
          "position",
          "verificationToken",
          "role",
          "signupStep",
          "wallet",
        ]; // add the keys that are not allowed to be updated

        // Remove disallowed keys from formData object using object destructuring
        const { ...filteredFormData } = formData;

        // Filter out disallowed keys from filteredFormData
        Object.keys(filteredFormData).forEach((key) => {
          if (disallowedKeys.includes(key) || filteredFormData[key] === "") {
            delete filteredFormData[key];
          }
        });

        // Update currentUser2 object with filteredFormData
        Object.assign(currentUser2, filteredFormData);

        await currentUser2.save();
        return res.status(200).json({ message: "User updated successfully." });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
