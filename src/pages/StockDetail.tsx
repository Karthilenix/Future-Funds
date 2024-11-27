import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStockStore } from '../stores/stockStore';
import { useAuthStore } from '../stores/authStore';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { toast } from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { stocks } = useStockStore();
  const { isAuthenticated } = useAuthStore();
  const stock = stocks.find(s => s.symbol === id);

  if (!stock) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Stock not found</h2>
        <button
          onClick={() => navigate('/stocks')}
          className="text-blue-600 hover:underline"
        >
          Back to Stocks
        </button>
      </div>
    );
  }

  // Sample data for the chart
  const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Stock Price',
        data: Array.from({ length: 30 }, () =>
          stock.price + (Math.random() - 0.5) * 20
        ),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const handleBuy = () => {
    if (!isAuthenticated) {
      toast.error('Please register or login to buy stocks');
      navigate('/register');
      return;
    }

    navigate('/payment', { 
      state: { 
        stock,
        action: 'buy'
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">{stock.name}</h1>
            <p className="text-xl text-gray-600">{stock.symbol}</p>
          </div>
          <button
            onClick={handleBuy}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buy Stock
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Current Price</p>
              <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {stock.changePercent >= 0 ? (
              <TrendingUp className="h-8 w-8 text-green-500" />
            ) : (
              <TrendingDown className="h-8 w-8 text-red-500" />
            )}
            <div>
              <p className="text-sm text-gray-600">24h Change</p>
              <p className={`text-xl font-bold ${
                stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Volume</p>
              <p className="text-xl font-bold">{(stock.volume / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="h-[400px]">
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">About {stock.name}</h2>
        <p className="text-gray-600">
          {stock.name} is a leading company in its sector with a market capitalization of ${(stock.marketCap / 1000000000).toFixed(2)}B.
          The company has shown {stock.changePercent >= 0 ? 'positive' : 'negative'} performance in recent trading sessions.
        </p>
      </div>
    </div>
  );
};

export default StockDetail;