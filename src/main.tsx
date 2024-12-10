import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Profile from './pages/Profile.tsx';
import MarketAnalysis from './pages/MarketAnalysis.tsx';
import Home from './pages/Home.tsx';
import StockList from './pages/StockList.tsx';
import StockDetail from './pages/StockDetail.tsx';
import SellStocks from './pages/SellStocks.tsx';
import Payment from './pages/Payment.tsx';
import SecureInvestment from './pages/SecureInvestment.tsx';
import InstantTrading from './pages/InstantTrading.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong!</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "stocks",
        element: <StockList />
      },
      {
        path: "stocks/:id",
        element: <StockDetail />
      },
      {
        path: "sell-stocks",
        element: <SellStocks />
      },
      {
        path: "payment",
        element: <Payment />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "secure-investment",
        element: <SecureInvestment />
      },
      {
        path: "instant-trading",
        element: <InstantTrading />
      },
      {
        path: "market-analysis",
        element: <MarketAnalysis />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
