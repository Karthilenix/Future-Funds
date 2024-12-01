import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:3000',
            'https://future-funds.vercel.app'
        ];
        
        // Allow all Vercel preview deployments
        if(origin.includes('vercel.app')) {
            return callback(null, true);
        }

        if(allowedOrigins.indexOf(origin) === -1) {
            return callback(null, true);
        }
        
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Enable pre-flight requests for all routes
app.options('*', cors());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Backend API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/future-funds')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});