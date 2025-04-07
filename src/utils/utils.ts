import Vehicle from '@/models/vehicle.model';
import { connectDB } from './mongoose';

export default async function getNextVehicleId() {
  try {
    await connectDB();
    const lastVehicle = await Vehicle.find().sort({ vehicleId: -1 }).limit(1);
    console.log(lastVehicle);
    let nextVehicleId = 'MB0001';
    if (lastVehicle.length > 0) {
      const lastVehicleIdNumber = parseInt(
        lastVehicle[0].vehicleId.substring(2)
      );
      const nextVehicleIdNumber = lastVehicleIdNumber + 1;
      nextVehicleId = 'MB' + nextVehicleIdNumber.toString().padStart(4, '0');
    }

    return nextVehicleId;
  } catch (error) {
    console.log(error);
  }
}
