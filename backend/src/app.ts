import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import stockRoutes from './routes/stocks';

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/future-funds')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

export default app;
