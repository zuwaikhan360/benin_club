import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/mongoose';
import Event, { EventDocument } from '@/models/event.model';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

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
        const event: EventDocument | null = await Event.findById(req.query.id);
        if (!event) {
          res.status(404).json({ message: 'Event not found' });
        } else {
          res.status(200).json(event);
        }
        break;
      case 'PUT':
        const updatedEvent: EventDocument | null =
          await Event.findByIdAndUpdate(req.query.id, req.body, { new: true });
        if (!updatedEvent) {
          res.status(404).json({ message: 'Event not found' });
        } else {
          res.status(200).json(updatedEvent);
        }
        break;
      case 'DELETE':
        const deletedEvent: EventDocument | null =
          await Event.findByIdAndDelete(req.query.id);
        if (!deletedEvent) {
          res.status(404).json({ message: 'Event not found' });
        } else {
          res.status(200).json(deletedEvent);
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
