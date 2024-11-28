import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth';
import stockRoutes from '../src/routes/stocks';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api', (req, res) => {
    res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

// Connect to MongoDB only if not already connected
if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGODB_URI!)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

// Export the Express API
export default app;
