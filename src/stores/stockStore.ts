import create from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/axios';
import { API_CONFIG } from '../config/api';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdate?: number;
}

interface UserStock extends Stock {
  shares: number;
  avgBuyPrice: number;
  profit: number;
}

interface StockState {
  stocks: Stock[];
  userStocks: UserStock[];
  loading: boolean;
  error: string | null;
  fetchStocks: () => Promise<void>;
  buyStock: (symbol: string, shares: number) => Promise<UserStock[] | undefined>;
  sellStock: (symbol: string, shares: number) => Promise<UserStock[]>;
  updateStockPrices: () => void;
  totalInvestment: number;
}

// Extended stock data with more companies
const sampleStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.72,
    change: 2.34,
    changePercent: 1.32,
    volume: 98234567,
    marketCap: 2800000000000,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: 1.87,
    changePercent: 1.33,
    volume: 24567890,
    marketCap: 1800000000000,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.92,
    change: 4.21,
    changePercent: 1.12,
    volume: 35678901,
    marketCap: 2500000000000,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 174.42,
    change: 3.15,
    changePercent: 1.84,
    volume: 45678901,
    marketCap: 1700000000000,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.50,
    change: -2.30,
    changePercent: -0.92,
    volume: 56789012,
    marketCap: 800000000000,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 485.58,
    change: 5.67,
    changePercent: 1.18,
    volume: 34567890,
    marketCap: 1200000000000,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.38,
    change: 15.24,
    changePercent: 1.77,
    volume: 43567890,
    marketCap: 2200000000000,
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 183.27,
    change: 1.45,
    changePercent: 0.80,
    volume: 23456789,
    marketCap: 550000000000,
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 279.87,
    change: 2.78,
    changePercent: 1.00,
    volume: 21345678,
    marketCap: 600000000000,
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    price: 162.32,
    change: 1.23,
    changePercent: 0.76,
    volume: 19876543,
    marketCap: 450000000000,
  },
  {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    price: 59.84,
    change: 0.45,
    changePercent: 0.76,
    volume: 18765432,
    marketCap: 260000000000,
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    price: 111.95,
    change: -0.85,
    changePercent: -0.75,
    volume: 22345678,
    marketCap: 205000000000,
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 605.88,
    change: 8.45,
    changePercent: 1.42,
    volume: 15678901,
    marketCap: 265000000000,
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings, Inc.',
    price: 62.34,
    change: -0.56,
    changePercent: -0.89,
    volume: 16789012,
    marketCap: 68000000000,
  },
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    price: 572.73,
    change: 6.89,
    changePercent: 1.22,
    volume: 12345678,
    marketCap: 258000000000,
  },
  {
    symbol: 'CRM',
    name: 'Salesforce, Inc.',
    price: 298.56,
    change: 3.67,
    changePercent: 1.24,
    volume: 14567890,
    marketCap: 292000000000,
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    price: 43.67,
    change: -0.34,
    changePercent: -0.77,
    volume: 25678901,
    marketCap: 184000000000,
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices, Inc.',
    price: 178.89,
    change: 4.56,
    changePercent: 2.62,
    volume: 23456789,
    marketCap: 289000000000,
  },
  {
    symbol: 'CSCO',
    name: 'Cisco Systems, Inc.',
    price: 48.98,
    change: 0.23,
    changePercent: 0.47,
    volume: 17890123,
    marketCap: 199000000000,
  },
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation',
    price: 112.45,
    change: 1.23,
    changePercent: 1.11,
    volume: 16789012,
    marketCap: 310000000000,
  }
];

export const useStockStore = create<StockState>()(
  persist(
    (set, get) => ({
      stocks: [],
      userStocks: [],
      loading: false,
      error: null,
      totalInvestment: 0,
      
      fetchStocks: async () => {
        set({ loading: true });
        try {
          const response = await fetch(`${API_CONFIG.baseURL}/api/stocks`);
          if (!response.ok) throw new Error('Failed to fetch stocks');
          const data = await response.json();
          set({ stocks: data, loading: false, error: null });
        } catch (error) {
          set({ error: 'Failed to fetch stocks', loading: false });
          console.error('Error fetching stocks:', error);
        }
      },

      updateStockPrices: () => {
        const updatedStocks = get().stocks.map(stock => ({
          ...stock,
          price: Number((stock.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
          changePercent: Number((Math.random() - 0.5) * 5)
        }));
        set({ stocks: updatedStocks });
      },
      
      buyStock: async (symbol: string, shares: number) => {
        try {
          const stock = get().stocks.find(s => s.symbol === symbol);
          if (!stock) return;

          const currentUserStocks = get().userStocks;
          const existingStock = currentUserStocks.find(s => s.symbol === symbol);
          const purchaseAmount = stock.price * shares;

          let updatedUserStocks;
          if (existingStock) {
            // Update existing stock
            const totalShares = existingStock.shares + shares;
            const newAvgPrice = ((existingStock.avgBuyPrice * existingStock.shares) + (stock.price * shares)) / totalShares;
            
            updatedUserStocks = currentUserStocks.map(s => 
              s.symbol === symbol 
                ? { 
                    ...s, 
                    shares: totalShares, 
                    avgBuyPrice: newAvgPrice,
                    profit: (stock.price - newAvgPrice) * totalShares 
                  }
                : s
            );
          } else {
            // Add new stock
            updatedUserStocks = [...currentUserStocks, {
              ...stock,
              shares,
              avgBuyPrice: stock.price,
              profit: 0
            }];
          }

          set(state => ({ 
            userStocks: updatedUserStocks,
            totalInvestment: state.totalInvestment + purchaseAmount
          }));

          return updatedUserStocks;
        } catch (error) {
          set({ error: 'Failed to buy stock' });
          throw error;
        }
      },

      sellStock: async (symbol: string, shares: number) => {
        try {
          const currentUserStocks = get().userStocks;
          const stockToSell = currentUserStocks.find(s => s.symbol === symbol);
          
          if (!stockToSell) {
            throw new Error('Stock not found in portfolio');
          }

          if (shares > stockToSell.shares) {
            throw new Error('Not enough shares to sell');
          }

          const updatedStocks = currentUserStocks.map(stock => {
            if (stock.symbol === symbol) {
              const remainingShares = stock.shares - shares;
              // If all shares are sold, remove the stock
              if (remainingShares === 0) {
                return null;
              }
              // Otherwise update the shares count
              return {
                ...stock,
                shares: remainingShares,
                profit: (stock.price - stock.avgBuyPrice) * remainingShares
              };
            }
            return stock;
          }).filter(Boolean) as UserStock[]; // Cast filtered array to UserStock[]

          // Calculate the sale amount
          const saleAmount = stockToSell.price * shares;

          set(state => ({
            userStocks: updatedStocks as UserStock[],
            totalInvestment: state.totalInvestment - (stockToSell.avgBuyPrice * shares)
          }));

          // Try to update the backend
          await api.post('/stocks/sell', {
            symbol,
            shares,
            price: stockToSell.price
          });

          return updatedStocks;
        } catch (error) {
          console.error('Error selling stock:', error);
          throw error;
        }
      }
    }),
    {
      name: 'stock-storage',
      partialize: (state) => ({
        userStocks: state.userStocks,
      }),
    }
  )
);