import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    stocks: Array<{
        symbol: string;
        shares: number;
        avgBuyPrice: number;
        transactions: Array<{
            type: 'buy' | 'sell';
            shares: number;
            price: number;
            date: Date;
        }>;
    }>;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    stocks: [{
        symbol: { type: String, required: true },
        shares: { type: Number, required: true },
        avgBuyPrice: { type: Number, required: true },
        transactions: [{
            type: { type: String, enum: ['buy', 'sell'], required: true },
            shares: { type: Number, required: true },
            price: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }]
    }]
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
