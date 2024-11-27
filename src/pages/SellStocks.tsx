import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStockStore } from '../stores/stockStore';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const SellStocks = () => {
    const navigate = useNavigate();
    const { userStocks, sellStock } = useStockStore();
    const [selectedStock, setSelectedStock] = useState<{
        symbol: string;
        shares: number;
    } | null>(null);
    const [shares, setShares] = useState(1);

    const handleSell = async (stock: { symbol: string; shares: number }) => {
        if (shares > stock.shares) {
            toast.error("You don't have enough shares to sell");
            return;
        }

        try {
            await sellStock(stock.symbol, shares);
            toast.success(`Successfully sold ${shares} shares of ${stock.symbol}`);
            setSelectedStock(null);
            setShares(1);
        } catch (error) {
            toast.error('Failed to sell stocks. Please try again.');
        }
    };

    if (!userStocks.length) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <AlertCircle className="w-16 h-16 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-700">No Stocks to Sell</h2>
                <p className="text-gray-600">You haven't purchased any stocks yet.</p>
                <button
                    onClick={() => navigate('/stocks')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                    Browse Stocks
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-2">Sell Stocks</h1>
                <p className="text-blue-100">Manage and sell your stock holdings</p>
            </div>

            <div className="grid gap-6">
                {userStocks.map((stock) => (
                    <div
                        key={stock.symbol}
                        className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.02] ${selectedStock?.symbol === stock.symbol ? 'ring-2 ring-blue-500' : ''
                            }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{stock.symbol}</h3>
                                <p className="text-gray-600">{stock.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Current Value</p>
                                <p className="text-xl font-bold">${(stock.price * stock.shares).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-600">Shares Owned</p>
                                <p className="font-semibold">{stock.shares}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Current Price</p>
                                <p className="font-semibold">${stock.price.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">24h Change</p>
                                <div className="flex items-center space-x-1">
                                    {stock.changePercent >= 0 ? (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                    <span className={stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Profit/Loss</p>
                                <p className={`font-semibold ${stock.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    ${stock.profit.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        {selectedStock?.symbol === stock.symbol ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        min="1"
                                        max={stock.shares}
                                        value={shares}
                                        onChange={(e) => setShares(Math.min(stock.shares, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="w-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-gray-600">
                                        Total: ${(shares * stock.price).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleSell(stock)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                    >
                                        <DollarSign className="h-4 w-4" />
                                        <span>Confirm Sale</span>
                                    </button>
                                    <button
                                        onClick={() => setSelectedStock(null)}
                                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setSelectedStock(stock)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Sell Stock
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellStocks;