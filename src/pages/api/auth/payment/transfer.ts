import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  const { user: loginUser } = session;

  const { image } = req.body;
  const userId = loginUser._id;

  try {
    await connectDB();

    try {
      // Find the user document by ID
      const user: IUser | null = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add the new image to the "hobbies" array field
      user.payments.push(image);

      // Save the updated user document to the database
      await user.save();

      res.status(200).json('Image added successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
