import { Zap, Clock, BarChart, Repeat } from "lucide-react";

const InstantTrading = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 py-8">
            <div className="text-center space-y-4">
                <Zap className="h-16 w-16 text-blue-600 mx-auto" />
                <h1 className="text-4xl font-bold text-gray-900">Instant Trading</h1>
                <p className="text-xl text-gray-600">
                    Execute trades instantly with real-time market data
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Trading Features</h2>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Real-Time Execution</h3>
                                <p className="text-gray-600">
                                    Execute trades within milliseconds of placing your order.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <BarChart className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Live Market Data</h3>
                                <p className="text-gray-600">
                                    Access real-time price updates and market movements.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Repeat className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold mb-2">Automated Trading</h3>
                                <p className="text-gray-600">
                                    Set up automated trades based on your preferred conditions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-2xl font-bold mb-4">Trading Benefits</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center space-x-3">
                            <Zap className="h-5 w-5 text-blue-600" />
                            <span>Zero latency order execution</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Zap className="h-5 w-5 text-blue-600" />
                            <span>Advanced order types</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Zap className="h-5 w-5 text-blue-600" />
                            <span>Price alerts and notifications</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Zap className="h-5 w-5 text-blue-600" />
                            <span>Mobile trading capabilities</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-xl font-bold text-blue-600">1</span>
                        </div>
                        <h3 className="font-semibold mb-2">Select Stock</h3>
                        <p className="text-gray-600">
                            Choose from our wide range of available stocks
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-xl font-bold text-blue-600">2</span>
                        </div>
                        <h3 className="font-semibold mb-2">Place Order</h3>
                        <p className="text-gray-600">Set your order details and confirm</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-xl font-bold text-blue-600">3</span>
                        </div>
                        <h3 className="font-semibold mb-2">Instant Execution</h3>
                        <p className="text-gray-600">Your order is executed immediately</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstantTrading;
