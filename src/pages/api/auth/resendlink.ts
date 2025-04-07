import { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import User from '@/models/user.model';
import { promisify } from 'util';
import sendEmail from '@/utils/sendEmail';
import { connectDB } from '@/utils/mongoose';

const randomBytesAsync = promisify(randomBytes);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const { email } = req.body;
  console.log(email);

  // Validate the ID and email fields
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  // Generate a unique token with a 1-hour expiration time
  const token = (await randomBytesAsync(16)).toString('hex');

  // Find the user with the specified member ID
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const verificationToken = {
    token,
    expires: Date.now() + 60 * 60 * 1000 * 24, // Expires in 24 hour
  };

  // Update the user's verification token and expiration date
  user.verificationToken = verificationToken;
  await user.save();

  // Send an email to the member with the reset password link
  const verifyUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  const message = `Please click the following link to verify your email address: ${verifyUrl}`;
  await sendEmail(email, 'Verify your email address', message);

  res.status(200).json({ message: 'Password reset link sent successfully.' });
}
