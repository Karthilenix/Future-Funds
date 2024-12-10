import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStockStore } from '../stores/stockStore';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'react-hot-toast';

const StockList = () => {
  const { stocks, loading, error, fetchStocks } = useStockStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        await fetchStocks();
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchStocks]);

  const handleStockClick = (symbol: string) => {
    if (!isAuthenticated) {
      toast.error('Please register or login to trade stocks');
      navigate('/register');
      return;
    }
    navigate(`/stocks/${symbol}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Stocks</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => handleStockClick(stock.symbol)}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{stock.symbol}</h3>
                <p className="text-gray-600">{stock.name}</p>
              </div>
              {stock.changePercent >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
                <p className={`text-sm ${stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Volume</p>
                <p className="text-sm font-medium">{(stock.volume / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;