import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import stockRoutes from './routes/stocks';
import { Request, Response } from 'express';
declare module '@vercel/node';

const app = express();

// Define allowed origins
const allowedOrigins = [
    'http://localhost:3000',                    // Local development
    'https://future-funds.vercel.app',          // Your production domain
    'https://future-funds-git-main.vercel.app', // Vercel preview deployments
    'https://future-funds-*.vercel.app'         // Vercel preview deployments
];

// Configure CORS
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.some(allowedOrigin => {
            // Check if the origin matches exactly or matches the wildcard pattern
            return origin === allowedOrigin ||
                (allowedOrigin.includes('*') && origin.match(allowedOrigin.replace('*', '.*')));
        })) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'API is running' });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/future-funds')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

export default app;
