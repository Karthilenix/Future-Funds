import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Newspaper, Phone, Mail, MapPin } from 'lucide-react';

const MarketNews = [
  { title: 'Daily Market Updates', path: '/market-news/daily' },
  { title: 'Economic Calendar', path: '/market-news/calendar' },
  { title: 'Company News', path: '/market-news/company' },
  { title: 'Global Markets', path: '/market-news/global' },
  { title: 'Industry Reports', path: '/market-news/industry' }
];

const LearningResources = [
  { title: 'Trading Basics', path: '/learn/basics' },
  { title: 'Technical Analysis', path: '/learn/technical' },
  { title: 'Investment Strategies', path: '/learn/strategies' },
  { title: 'Risk Management', path: '/learn/risk' },
  { title: 'Video Tutorials', path: '/learn/tutorials' }
];

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/home" className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Future Funds</span>
            </Link>
            <p className="text-gray-600">
              Your trusted platform for smart investing and wealth building.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>karthikeyan@futurefunds.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-4 w-4" />
                <span>1-800-FUTURES</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Chennai,Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/stocks" className="text-gray-600 hover:text-blue-600">
                  Stocks
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-600 hover:text-blue-600">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/secure-investment" className="text-gray-600 hover:text-blue-600">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/instant-trading" className="text-gray-600 hover:text-blue-600">
                  Trading
                </Link>
              </li>
              <li>
                <Link to="/market-analysis" className="text-gray-600 hover:text-blue-600">
                  Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Market News */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Newspaper className="h-5 w-5 text-blue-600" />
              <span>Market News</span>
            </h3>
            <ul className="space-y-2">
              {MarketNews.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Center */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <span>Learning Center</span>
            </h3>
            <ul className="space-y-2">
              {LearningResources.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="text-gray-600 hover:text-blue-600 flex items-center space-x-2">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Future Funds. All rights reserved.
            </p>
            <div className="flex space-x-6 md:justify-end">
              <Link to="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-gray-600 hover:text-blue-600 text-sm">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;