import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import Gallery, { GalleryDocument } from '@/models/gallery.model';

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

    const { user } = session;

    if (user.role !== 'admin' && user.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    switch (req.method) {
      case 'GET':
        const galleries: GalleryDocument[] = await Gallery.find().sort({
          createdAt: -1,
        });
        res.status(200).json(galleries);
        break;
      case 'POST':
        const newUser: GalleryDocument = new Gallery(req.body);
        await newUser.save();
        res.status(201).json(newUser);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
