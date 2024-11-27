import mongoose, { Schema, Document } from 'mongoose';

export interface IUserStock extends Document {
    userId: mongoose.Types.ObjectId;
    symbol: string;
    shares: number;
    avgBuyPrice: number;
    transactions: {
        type: 'buy' | 'sell';
        shares: number;
        price: number;
        date: Date;
    }[];
}

const UserStockSchema = new Schema<IUserStock>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    symbol: { type: String, required: true },
    shares: { type: Number, required: true },
    avgBuyPrice: { type: Number, required: true },
    transactions: [{
        type: { type: String, enum: ['buy', 'sell'], required: true },
        shares: { type: Number, required: true },
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
    }]
});

const UserStock = mongoose.model<IUserStock>('UserStock', UserStockSchema);
export default UserStock;