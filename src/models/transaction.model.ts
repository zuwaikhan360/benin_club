import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction {
  [key: string]: any;
  description: string;
  amount: number;
  bal: number;
  status: 'Pending' | 'Completed' | 'Failed';
  invoiceId: string;
  userId: Schema.Types.ObjectId;
  paymentMethod: string;
  type: 'credit' | 'debit';
  for: 'subscription' | 'wallet';
  reference: string;
  initiatedBy: Schema.Types.ObjectId;
  meta: object;
}

export type TransactionDocument = ITransaction & Document;

const transactionSchema = new Schema<TransactionDocument>(
  {
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    type: { type: String, required: true, enum: ['credit', 'debit'] },
    for: { type: String, required: true, enum: ['subscription', 'wallet'] },
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentMethod: { type: String, required: true },
    invoiceId: { type: String },
    reference: { type: String },
    amount: { type: Number, required: true },
    bal: { type: Number },
    initiatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    meta: { type: Object },
  },
  {
    timestamps: true,
  }
);

transactionSchema.pre<TransactionDocument>('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  const prefix = 'INV-';
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const count = await Transaction.countDocuments();

  this.invoiceId = `${prefix}${currentDate}-${count + 1}`;

  next();
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default Transaction;
