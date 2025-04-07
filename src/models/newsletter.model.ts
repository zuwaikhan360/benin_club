import mongoose, { Document, Schema } from "mongoose";
import { model } from "mongoose";
import { models } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  isMember: boolean;
  sent: boolean;
}

const newsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isMember: {
      type: Boolean,
      default: false,
    },
    sent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Create a Mongoose model based on the schema
const Newsletter =
  models.Newsletter || model<INewsletter>("Newsletter", newsletterSchema);

export default Newsletter;
