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
        const event: GalleryDocument | null = await Gallery.findById(
          req.query.id
        );
        if (!event) {
          res.status(404).json({ message: 'Gallery not found' });
        } else {
          res.status(200).json(event);
        }
        break;
      case 'PUT':
        const updatedGallery: GalleryDocument | null =
          await Gallery.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
          });
        if (!updatedGallery) {
          res.status(404).json({ message: 'Gallery not found' });
        } else {
          res.status(200).json(updatedGallery);
        }
        break;
      case 'DELETE':
        const deletedGallery: GalleryDocument | null =
          await Gallery.findByIdAndDelete(req.query.id);
        if (!deletedGallery) {
          res.status(404).json({ message: 'Gallery not found' });
        } else {
          res.status(200).json(deletedGallery);
        }
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
