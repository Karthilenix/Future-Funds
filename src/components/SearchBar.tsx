import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useStockStore } from '../stores/stockStore';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const { stocks } = useStockStore();

    const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
stock.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleStockClick = (symbol: string) => {
    setQuery('');
    setShowResults(false);
    navigate(`/stocks/${symbol}`);
};

    return (
        <div className="relative">
        <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
            type="text"
            value={query}
            onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        placeholder="Search stocks..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    </div>

    {showResults && query && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto">
            {filteredStocks.length > 0 ? (
            filteredStocks.map((stock) => (
                <button
                key={stock.symbol}
                onClick={() => handleStockClick(stock.symbol)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between items-center"
                >
                <div>
                    <p className="font-semibold">{stock.symbol}</p>
                    <p className="text-sm text-gray-600">{stock.name}</p>
                </div>
                <p className="font-semibold">${stock.price.toFixed(2)}</p>
                </button>
            ))
            ) : (
            <div className="px-4 py-3 text-gray-600">No stocks found</div>
        )}
        </div>
    )}
    </div>
);
};

export default SearchBar;