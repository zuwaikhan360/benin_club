import type { NextApiRequest, NextApiResponse } from 'next';
import Transaction from '@/models/transaction.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';

export default async function handleGetTransactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  const { user } = session;

  if (user.role !== 'admin' && user.role !== 'wallet') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const { id: userId } = req.query;

  try {
    await connectDB();
    // Find all transactions for the given user
    const transactions = await Transaction.find({
      userId: userId,
      for: 'wallet',
    }).sort({ createdAt: -1 });
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
