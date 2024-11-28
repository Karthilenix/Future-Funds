import type { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../src/models/User';

// Connect to MongoDB
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI!);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await connectDB();

    if (req.method === 'POST') {
        if (req.url?.includes('/login')) {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });
                
                if (!user) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }

                const token = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET!,
                    { expiresIn: '24h' }
                );

                return res.json({
                    token,
                    user: {
                        _id: user._id,
                        email: user.email,
                        username: user.username
                    }
                });
            } catch (error) {
                console.error('Login error:', error);
                return res.status(500).json({ message: 'Server error' });
            }
        }
    }

    return res.status(405).json({ message: 'Method not allowed' });
} 