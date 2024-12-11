import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      {isHomePage && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
};

export default App;