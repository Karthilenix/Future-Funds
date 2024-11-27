import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useStockStore } from '../stores/stockStore';
import { User, Briefcase, History, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { userStocks, fetchStocks } = useStockStore();

    useEffect(() => {
        fetchStocks();
    }, [fetchStocks]);

    const totalInvestment = userStocks.reduce(
        (sum, stock) => sum + stock.avgBuyPrice * stock.shares,
        0
    );

    const currentValue = userStocks.reduce(
        (sum, stock) => sum + stock.price * stock.shares,
        0
    );

    const totalProfit = currentValue - totalInvestment;
    const profitPercentage = (totalProfit / totalInvestment) * 100 || 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-8"
        >
            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl shadow-lg"
            >
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/10 rounded-full">
                        <User className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.username || 'Profile'}</h1>
                        <p className="text-blue-100">{user?.email || 'No email available'}</p>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <Briefcase className="h-6 w-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">Total Investment</h2>
                    </div>
                    <p className="text-2xl font-bold">${totalInvestment.toFixed(2)}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        <History className="h-6 w-6 text-blue-600" />
                        <h2 className="text-lg font-semibold">Current Value</h2>
                    </div>
                    <p className="text-2xl font-bold">${currentValue.toFixed(2)}</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                        {totalProfit >= 0 ? (
                            <TrendingUp className="h-6 w-6 text-green-500" />
                        ) : (
                            <TrendingDown className="h-6 w-6 text-red-500" />
                        )}
                        <h2 className="text-lg font-semibold">Total Profit/Loss</h2>
                    </div>
                    <p
                        className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                    >
                        {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
                        <span className="text-sm ml-2">
                            ({profitPercentage >= 0 ? '+' : ''}
                            {profitPercentage.toFixed(2)}%)
                        </span>
                    </p>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">Your Stocks</h2>
                </div>
                <div className="divide-y">
                    {userStocks.length > 0 ? (
                        userStocks.map((stock) => (
                            <motion.div
                                key={stock.symbol}
                                whileHover={{ scale: 1.01 }}
                                className="p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{stock.symbol}</h3>
                                        <p className="text-sm text-gray-600">{stock.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${(stock.price * stock.shares).toFixed(2)}</p>
                                        <p className="text-sm text-gray-600">{stock.shares} shares</p>
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        {stock.profit >= 0 ? (
                                            <TrendingUp className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-red-500" />
                                        )}
                                        <span
                                            className={`text-sm ${stock.profit >= 0 ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {stock.profit >= 0 ? '+' : ''}${stock.profit.toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/stocks/${stock.symbol}`)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p>You haven't purchased any stocks yet.</p>
                            <button
                                onClick={() => navigate('/stocks')}
                                className="mt-4 text-blue-600 hover:underline"
                            >
                                Browse Stocks
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;