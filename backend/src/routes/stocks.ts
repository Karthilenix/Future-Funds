import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// Sample stock data (you can replace this with your database)
const sampleStocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 150.25,
        changePercent: 1.2,
        volume: 1000000,
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 2750.80,
        changePercent: -0.8,
        volume: 500000,
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 310.15,
        changePercent: 0.5,
        volume: 750000,
    },
    // Add more sample stocks as needed
];

// Get all stocks
router.get('/', async (req, res) => {
    try {
        // For now, return sample data
        // In a real app, you would fetch this from a database
        res.json(sampleStocks);
    } catch (error) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Error fetching stocks' });
    }
});

export default router;