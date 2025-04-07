import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Transaction, { TransactionDocument } from '@/models/transaction.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: 'You must log in to access this resource.' });

    const { user: loginUser } = session;

    if (loginUser.role !== 'admin' && loginUser.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();
    const { id: userId } = req.query;

    switch (req.method) {
      case 'GET':
        // Find all transactions for the given user
        const transactions = await Transaction.find({
          userId: userId,
          for: 'subscription',
        }).sort({ createdAt: -1 });
        return res.status(200).json({ transactions });
        break;

      case 'PUT':
        const { subcriptionBal: amount, year } = req.body;
        console.log(req.body, amount);

        if (!year) {
          return res.status(400).json({ message: 'Enter payment year' });
        }

        const updatedUser: IUser | null = await User.findOneAndUpdate(
          { _id: userId },
          {
            $inc: { subcriptionBal: -amount },
            lastPamentYear: year,
          },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        console.log('amount', amount);
        // Create a new transaction record

        await Transaction.create({
          userId,
          type: 'credit',
          amount,
          reference: '',
          status: 'Completed',
          description: 'Subscription payment',
          paymentMethod: 'deposit',
          initiatedBy: loginUser._id, // Assuming loginUser is defined somewhere
          for: 'subscription',
          meta: { lastPamentYear: year },
        });
        console.log('hello1');

        // await transaction.save();

        console.log('hello2');
        res.status(200).json(updatedUser);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
