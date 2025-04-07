import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';
import Constant, { IConstant } from '@/models/constant.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });
  }

  const { user: loginUser } = session;

  if (loginUser.role !== 'admin' && loginUser.role !== 'user') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const constant: IConstant | null = await Constant.findOne({
          name: 'newsletter',
        });

        if (!constant) {
          return res
            .status(404)
            .json({ message: 'Newsletter constant not found' });
        }

        console.log(constant);

        res.status(200).json({ newsletter: constant.value });
      } catch (error) {
        console.error('Error fetching newsletter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    case 'POST':
      try {
        console.log(req.body.newsletterUrl);
        // Update or create newsletter subscription constant
        let constant: IConstant | null = await Constant.findOneAndUpdate(
          { name: 'newsletter' },
          { value: req.body.newsletterUrl },
          { upsert: true, new: true }
        );

        res
          .status(201)
          .json({ message: 'Newsletter updated successfully', constant });
      } catch (error) {
        console.error('Error updating newsletter:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
