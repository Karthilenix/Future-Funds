import React from 'react';
import { Link } from 'react-router-dom';
import { useStockStore } from '../stores/stockStore';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

// Simulated portfolio data
const portfolioStocks = [
  { symbol: 'AAPL', shares: 10 },
  { symbol: 'GOOGL', shares: 5 },
  { symbol: 'MSFT', shares: 8 },
];

const Portfolio = () => {
  const { userStocks, totalInvestment } = useStockStore();

  const totalCurrentValue = userStocks.reduce(
    (sum, stock) => sum + (stock.price * stock.shares),
    0
  );

  const totalProfit = totalCurrentValue - totalInvestment;
  const profitPercentage = totalInvestment > 0 
    ? (totalProfit / totalInvestment) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Investment</p>
            <p className="text-2xl font-bold">${totalInvestment.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Value</p>
            <p className="text-2xl font-bold">${totalCurrentValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Profit/Loss</p>
            <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)}
              <span className="text-sm ml-2">
                ({profitPercentage.toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {portfolioStocks.map(item => {
          const stockInfo = userStocks.find(s => s.symbol === item.symbol);
          if (!stockInfo) return null;
          return {
            ...stockInfo,
            shares: item.shares,
            totalValue: stockInfo.price * item.shares,
          };
        }).filter(Boolean).map(stock => stock && (
          <div key={stock.symbol} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <Link to={`/stocks/${stock.symbol}`} className="text-xl font-semibold hover:text-blue-600">
                  {stock.symbol}
                </Link>
                <p className="text-gray-600">{stock.name}</p>
              </div>
              {stock.changePercent >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600">Shares</p>
                <p className="text-lg font-semibold">{stock.shares}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-lg font-semibold">${stock.price.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-lg font-semibold">${stock.totalValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">24h Change</p>
                <p className={`text-lg font-semibold ${
                  stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;