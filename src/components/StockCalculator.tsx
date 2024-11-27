import React, { useState } from 'react';
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const StockCalculator = () => {
    const [buyPrice, setBuyPrice] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [result, setResult] = useState<{ profit: number; percentage: number } | null>(null);

    const calculateProfit = () => {
        const buy = parseFloat(buyPrice);
        const sell = parseFloat(sellPrice);
        const qty = parseFloat(quantity);

        if (buy && sell && qty) {
            const profit = (sell - buy) * qty;
            const percentage = ((sell - buy) / buy) * 100;
            setResult({ profit, percentage });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm"
        >
            <div className="flex items-center space-x-3 mb-6">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold">Stock Profit Calculator</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Buy Price
                    </label>
                    <input
                        type="number"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter buy price"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sell Price
                    </label>
                    <input
                        type="number"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter sell price"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                    </label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter quantity"
                    />
                </div>

                <button
                    onClick={calculateProfit}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Calculate
                </button>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">Profit/Loss:</span>
                            <div className="flex items-center space-x-2">
                                {result.profit >= 0 ? (
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-5 w-5 text-red-500" />
                                )}
                                <span
                                    className={`font-bold ${result.profit >= 0 ? 'text-green-500' : 'text-red-500'
                                        }`}
                                >
                                    ${Math.abs(result.profit).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Percentage:</span>
                            <span
                                className={`font-bold ${result.percentage >= 0 ? 'text-green-500' : 'text-red-500'
                                    }`}
                            >
                                {result.percentage >= 0 ? '+' : ''}
                                {result.percentage.toFixed(2)}%
                            </span>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default StockCalculator;