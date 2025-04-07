import mongoose, { Schema, Document } from "mongoose";

export interface ITransactionText {
  [key: string]: any;
  description: string;
  amount: number;
  bal: number;
  status: "Pending" | "Completed" | "Failed";
  invoiceId: string;
  userId: Schema.Types.ObjectId;
  paymentMethod: string;
  type: "credit" | "debit";
  for: "subscription" | "wallet";
  reference: string;
  initiatedBy: Schema.Types.ObjectId;
}

export type TransactionDocumentTest = ITransactionText & Document;

const transactionTestSchema = new Schema<TransactionDocumentTest>(
  {
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    type: { type: String, required: true, enum: ["credit", "debit"] },
    for: { type: String, required: true, enum: ["subscription", "wallet"] },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    paymentMethod: { type: String, required: true },
    invoiceId: { type: String },
    reference: { type: String },
    amount: { type: Number, required: true },
    bal: { type: Number, required: true },
    initiatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

transactionTestSchema.pre<TransactionDocumentTest>(
  "save",
  async function (next) {
    if (!this.isNew) {
      return next();
    }

    const prefix = "INV-";
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const count = await TransactionTest.countDocuments();

    this.invoiceId = `${prefix}${currentDate}-${count + 1}`;

    next();
  }
);

const TransactionTest =
  mongoose.models.TransactionTest ||
  mongoose.model<TransactionDocumentTest>(
    "TransactionTest",
    transactionTestSchema
  );

export default TransactionTest;
