import { Schema, model, Document, models } from 'mongoose';

export interface IWallet {
  userId: Schema.Types.ObjectId;
  balance: number;
}

export type WalletDocument = IWallet & Document;

const walletSchema = new Schema<WalletDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  balance: { type: Number, default: 0, required: true },
});

const Wallet = models.Wallet || model<WalletDocument>('Wallet', walletSchema);

export default Wallet;
