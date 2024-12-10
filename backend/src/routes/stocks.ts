import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();

// Base stock data
const baseStocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        basePrice: 150.25,
        volume: 1000000,
        marketCap: 2800000000000,
        change: 0
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        basePrice: 2750.80,
        volume: 500000,
        marketCap: 2000000000000,
        change: 0
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        basePrice: 310.15,
        volume: 750000,
        marketCap: 2500000000000,
        change: 0
    }
];

// Function to generate dynamic stock data
const generateDynamicStocks = () => {
    return baseStocks.map(stock => {
        const priceChange = (Math.random() - 0.5) * 5; // Random price change between -2.5 and 2.5
        const newPrice = stock.basePrice + priceChange;
        const changePercent = (priceChange / stock.basePrice) * 100;
        
        return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(priceChange.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
            volume: stock.volume + Math.floor(Math.random() * 100000),
            marketCap: stock.marketCap
        };
    });
};

// Get all stocks
router.get('/', async (req: Request, res: Response) => {
    try {
        const dynamicStocks = generateDynamicStocks();
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.json(dynamicStocks);
    } catch (error) {
        console.error('Error generating stocks:', error);
        res.status(500).json({ message: 'Error fetching stocks' });
    }
});

export default router;