import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  carPlateNumber: string;
  vehicleId: string;
  vehicleType?: string;
  vehicleColor?: string;
  purposeOfVehicle?: string;
  regNumber?: string;
  imageUrl: string;
  qrCodeUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  memberId: Schema.Types.ObjectId;
}

const vehicleSchema: Schema = new Schema(
  {
    vehicleId: {
      type: String,
      required: true,
    },
    memberId: { type: Schema.Types.ObjectId, ref: 'User' },

    carPlateNumber: {
      type: String,
    },
    vehicleType: {
      type: String,
    },
    vehicleColor: {
      type: String,
    },
    purposeOfVehicle: {
      type: String,
    },
    regNumber: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    qrCodeUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Vehicle =
  mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', vehicleSchema);

export default Vehicle;
