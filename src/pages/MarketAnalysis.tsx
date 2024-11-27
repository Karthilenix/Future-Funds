import { BarChart2, TrendingUp, PieChart, LineChart } from "lucide-react";

const MarketAnalysis = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
            <div className="text-center space-y-4">
                <BarChart2 className="h-16 w-16 text-blue-600 mx-auto" />
                <h1 className="text-4xl font-bold text-gray-900">Market Analysis</h1>
                <p className="text-xl text-gray-600">
                    Get detailed insights and analysis for informed decisions
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Analysis Tools</h2>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <TrendingUp className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Technical Analysis</h3>
                                <p className="text-gray-600">
                                    Advanced charting tools with multiple indicators and
                                    timeframes.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <PieChart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Fundamental Analysis</h3>
                                <p className="text-gray-600">
                                    Company financials, ratios, and performance metrics.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <LineChart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Market Sentiment</h3>
                                <p className="text-gray-600">
                                    Real-time sentiment analysis and social media trends.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Available Indicators</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Moving Averages",
                            "RSI",
                            "MACD",
                            "Bollinger Bands",
                            "Volume Analysis",
                            "Price Momentum",
                            "Support/Resistance",
                            "Trend Lines",
                        ].map((indicator, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <BarChart2 className="h-4 w-4 text-blue-600" />
                                <span className="text-sm">{indicator}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Research & Reports</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Daily Market Updates</h3>
                        <p className="text-gray-600 text-sm">
                            Get daily insights on market movements and trends.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Stock Reports</h3>
                        <p className="text-gray-600 text-sm">
                            Detailed analysis reports on individual stocks.
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Industry Analysis</h3>
                        <p className="text-gray-600 text-sm">
                            Comprehensive sector and industry analysis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketAnalysis;
