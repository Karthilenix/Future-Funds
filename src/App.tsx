import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StockList from './pages/StockList';
import StockDetail from './pages/StockDetail';
import SellStocks from './pages/SellStocks';
import Payment from './pages/Payment';
import Profile from './pages/Profile.tsx';
import SecureInvestment from './pages/SecureInvestment';
import InstantTrading from './pages/InstantTrading';
import MarketAnalysis from './pages/MarketAnalysis';
import Footer from './components/Footer';
import { useStockStore } from './stores/stockStore';

function App() {
  const { updateStockPrices } = useStockStore();

  useEffect(() => {
    // Update stock prices every 5 seconds
    const interval = setInterval(() => {
      updateStockPrices();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateStockPrices]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/stocks" element={<StockList />} />
              <Route path="/stocks/:id" element={<StockDetail />} />
              <Route path="/sell-stocks" element={<SellStocks />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/secure-investment" element={<SecureInvestment />} />
              <Route path="/instant-trading" element={<InstantTrading />} />
              <Route path="/market-analysis" element={<MarketAnalysis />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;