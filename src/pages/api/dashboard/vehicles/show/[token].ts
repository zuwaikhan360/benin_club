import Vehicle, { IVehicle } from '@/models/vehicle.model';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/utils/mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: 'You must log in to access this resource.' });

  const { user } = session;

  if (user.role !== 'admin') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectDB();

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'token is required' });
  }

  try {
    const vehicle = await Vehicle.findOne({
      qrCodeUrl: token,
    }).populate({ path: 'memberId', select: 'surName firstName' });

    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    console.log();
    res.status(500).json({ message: 'Error fetching vehicle details' });
  }
}
