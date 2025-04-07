import type { NextApiRequest, NextApiResponse } from 'next';
import Wallet from '@/models/wallet.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';

export default async function handleBalance(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  const { user: loginUser } = session;

  const userId = loginUser._id;

  try {
    await connectDB();

    const wallet = await Wallet.findOne({ userId: userId });

    if (wallet) {
      return res.status(200).json({
        balance: wallet.balance,
      });
    } else {
      return res.status(404).json({
        message: 'Wallet not found',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while retrieving your wallet balance',
    });
  }
}
