import mongoose, { Document, Schema } from 'mongoose';
import { model } from 'mongoose';
import { models } from 'mongoose';

export interface IConstant extends Document {
  name: string;
  value: string;
}

const constantSchema = new Schema<IConstant>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model based on the schema
const Constant =
  models.Constant || model<IConstant>('Constant', constantSchema);

export default Constant;
