import { NextApiRequest, NextApiResponse } from 'next';
import { Types } from 'mongoose';

import Vehicle, { IVehicle } from '@/models/vehicle.model';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

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

  if (user.role !== 'admin' && user.role !== 'user') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const { vehicleId } = req.query;

        if (!vehicleId) {
          return res
            .status(400)
            .json({ message: 'vehicleId address is required' });
        }

        if (!Types.ObjectId.isValid(vehicleId.toString())) {
          return res.status(400).json({ message: 'Invalid ID' });
        }

        const vehicle: IVehicle | null = await Vehicle.findById(vehicleId);

        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json(vehicle);
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    case 'POST':
      try {
        const {
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          qrCodeUrl,
        } = req.body;

        const vehicle: IVehicle = new Vehicle({
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          qrCodeUrl,
        });

        const savedVehicle = await vehicle.save();

        res.status(201).json(savedVehicle);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    case 'PUT':
      try {
        const { vehicleId } = req.query;

        if (!vehicleId) {
          return res
            .status(400)
            .json({ message: 'vehicleId address is required' });
        }

        if (!Types.ObjectId.isValid(vehicleId.toString())) {
          return res.status(400).json({ message: 'Invalid ID' });
        }

        const {
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          memberId,
        } = req.body;

        const vehicle: IVehicle | null = await Vehicle.findById(vehicleId);

        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }

        vehicle.carPlateNumber = carPlateNumber || vehicle.carPlateNumber;
        vehicle.vehicleType = vehicleType || vehicle.vehicleType;
        vehicle.vehicleColor = vehicleColor || vehicle.vehicleColor;
        vehicle.purposeOfVehicle = purposeOfVehicle || vehicle.purposeOfVehicle;
        vehicle.regNumber = regNumber || vehicle.regNumber;
        vehicle.imageUrl = imageUrl || vehicle.imageUrl;
        vehicle.memberId = memberId || vehicle.memberId;

        const updatedVehicle = await vehicle.save();

        res.status(200).json(updatedVehicle);
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    case 'DELETE':
      try {
        const { vehicleId } = req.query;

        if (!vehicleId) {
          return res
            .status(400)
            .json({ message: 'vehicleId address is required' });
        }

        if (!Types.ObjectId.isValid(vehicleId.toString())) {
          return res.status(400).json({ message: 'Invalid ID' });
        }

        const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);

        if (!deletedVehicle) {
          return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
