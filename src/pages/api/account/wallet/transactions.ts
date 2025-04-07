import type { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '@/models/transaction.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';

export default async function handleGetTransactions(
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
    // Find all transactions for the given user
    const transactions = await Transaction.find({ userId, for: 'wallet' }).sort(
      { createdAt: -1 }
    );

    return res.status(200).json({
      transactions: transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while retrieving transactions',
    });
  }
}
