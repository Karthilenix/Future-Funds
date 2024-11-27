import express, { Request, Response, Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User'; // Your Mongoose model

dotenv.config();

interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

const router: Router = express.Router();

// Register
router.post(
    '/register',
    async (req: Request<any, any, RegisterRequestBody>, res: Response) :  Promise<any> => {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new User({
                username,
                email,
                password: hashedPassword,
            });

            await user.save();

            // Create token
            const token = jwt.sign(
                { userId: user._id },
                    process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            res.status(201).json({ token, userId: user._id });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Server error', error: (error as Error).message });
        }
    }
);

// Login
router.post(
    '/login',
    async (req: Request<ParamsDictionary, any, LoginRequestBody>, res: Response) : Promise<any> => {
        try {
            const { email, password } = req.body;

            // Find user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Create token
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET || 'karthiqwert2525',
                { expiresIn: '24h' }
            );

            // Send user data (excluding password) along with token
            res.json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    username: user.username
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Server error', error: (error as Error).message });
        }
    }
);

// Logout
router.post('/logout', async (req: Request, res: Response) => {
    try {
        // You might want to invalidate the token on the backend
        // For now, we'll just send a success response
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out' });
    }
});

export default router;
