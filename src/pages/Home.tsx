import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, BarChart2 } from 'lucide-react';
import StockCalculator from '../components/StockCalculator';
import { useAuthStore } from '../stores/authStore';

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
      className="space-y-20"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="text-center space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900"
        >
          Invest in Your Future with{' '}
          <motion.span
            initial={{ color: '#2563EB' }}
            animate={{ color: ['#2563EB', '#3B82F6', '#60A5FA', '#2563EB'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-blue-600"
          >
            Future Funds
          </motion.span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Start your investment journey today. Simple, secure, and smart way to build your wealth.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {!isAuthenticated && (
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          )}
          <Link
            to="/stocks"
            className="px-8 py-3 bg-blue-700 text-black-800 rounded-lg hover:bg-blue-400 transition-all transform hover:scale-105"
          >
            View Stocks
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        className="grid md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: Shield,
            title: 'Secure Investment',
            description: 'Your investments are protected with bank-level security.',
            link: '/secure-investment'
          },
          {
            icon: Zap,
            title: 'Instant Trading',
            description: 'Execute trades instantly with real-time market data.',
            link: '/instant-trading'
          },
          {
            icon: BarChart2,
            title: 'Market Analysis',
            description: 'Get detailed insights and analysis for informed decisions.',
            link: '/market-analysis'
          }
        ].map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link
              to={feature.link}
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Learn More
              <TrendingUp className="h-4 w-4 ml-2" />
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Calculator Section */}
      <motion.section
        variants={itemVariants}
        className="max-w-md mx-auto"
      >
        <StockCalculator />
      </motion.section>
    </motion.div>
  );
};

export default Home;