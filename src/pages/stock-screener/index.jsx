import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterSidebar from './components/FilterSidebar';
import ActiveFilters from './components/ActiveFilters';
import ScreenerResults from './components/ScreenerResults';
import SavedScreens from './components/SavedScreens';

import Button from '../../components/ui/Button';

const StockScreener = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    peRatio: '',
    dividendYield: '',
    marketCap: '',
    minPrice: '',
    maxPrice: '',
    rsiMin: '',
    rsiMax: '',
    above50MA: false,
    above200MA: false,
    sectors: []
  });

  const [savedScreens, setSavedScreens] = useState([
    {
      id: 1,
      name: 'High Dividend Stocks',
      description: 'Stocks with dividend yield above 4%',
      filters: { dividendYield: '4', marketCap: 'large' },
      createdAt: '2025-01-20T10:30:00Z'
    },
    {
      id: 2,
      name: 'Growth Tech Stocks',
      description: 'Technology stocks with strong growth potential',
      filters: { sectors: ['technology'], peRatio: 'medium', above50MA: true },
      createdAt: '2025-01-18T14:15:00Z'
    }
  ]);

  // Mock stock data
  const mockStocks = [
    {
      id: 1,
      symbol: 'AAPL',
      companyName: 'Apple Inc.',
      exchange: 'NASDAQ',
      sector: 'Technology',
      price: 192.53,
      change: 2.34,
      peRatio: 28.5,
      dividendYield: 0.5,
      marketCap: '2.98T',
      score: 8.5,
      rsi: 65,
      above50MA: true,
      above200MA: true
    },
    {
      id: 2,
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation',
      exchange: 'NASDAQ',
      sector: 'Technology',
      price: 415.26,
      change: -1.23,
      peRatio: 32.1,
      dividendYield: 0.7,
      marketCap: '3.08T',
      score: 9.2,
      rsi: 58,
      above50MA: true,
      above200MA: true
    },
    {
      id: 3,
      symbol: 'JNJ',
      companyName: 'Johnson & Johnson',
      exchange: 'NYSE',
      sector: 'Healthcare',
      price: 156.78,
      change: 0.89,
      peRatio: 15.2,
      dividendYield: 3.1,
      marketCap: '418.5B',
      score: 7.8,
      rsi: 52,
      above50MA: true,
      above200MA: true
    },
    {
      id: 4,
      symbol: 'KO',
      companyName: 'The Coca-Cola Company',
      exchange: 'NYSE',
      sector: 'Consumer Goods',
      price: 62.45,
      change: 1.56,
      peRatio: 24.8,
      dividendYield: 3.0,
      marketCap: '270.2B',
      score: 7.5,
      rsi: 48,
      above50MA: false,
      above200MA: true
    },
    {
      id: 5,
      symbol: 'XOM',
      companyName: 'Exxon Mobil Corporation',
      exchange: 'NYSE',
      sector: 'Energy',
      price: 118.92,
      change: -2.14,
      peRatio: 13.7,
      dividendYield: 5.8,
      marketCap: '485.3B',
      score: 6.9,
      rsi: 42,
      above50MA: false,
      above200MA: false
    },
    {
      id: 6,
      symbol: 'JPM',
      companyName: 'JPMorgan Chase & Co.',
      exchange: 'NYSE',
      sector: 'Financial Services',
      price: 234.67,
      change: 3.21,
      peRatio: 12.4,
      dividendYield: 2.1,
      marketCap: '685.7B',
      score: 8.1,
      rsi: 71,
      above50MA: true,
      above200MA: true
    },
    {
      id: 7,
      symbol: 'PG',
      companyName: 'Procter & Gamble Co.',
      exchange: 'NYSE',
      sector: 'Consumer Goods',
      price: 165.43,
      change: 0.78,
      peRatio: 26.3,
      dividendYield: 2.4,
      marketCap: '394.8B',
      score: 7.6,
      rsi: 55,
      above50MA: true,
      above200MA: true
    },
    {
      id: 8,
      symbol: 'NVDA',
      companyName: 'NVIDIA Corporation',
      exchange: 'NASDAQ',
      sector: 'Technology',
      price: 875.28,
      change: 4.67,
      peRatio: 65.2,
      dividendYield: 0.03,
      marketCap: '2.16T',
      score: 9.5,
      rsi: 78,
      above50MA: true,
      above200MA: true
    }
  ];

  const [filteredResults, setFilteredResults] = useState(mockStocks);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let results = [...mockStocks];

    // Apply P/E ratio filter
    if (filters.peRatio) {
      results = results.filter(stock => {
        switch (filters.peRatio) {
          case 'low':
            return stock.peRatio < 15;
          case 'medium':
            return stock.peRatio >= 15 && stock.peRatio <= 25;
          case 'high':
            return stock.peRatio > 25;
          default:
            return true;
        }
      });
    }

    // Apply dividend yield filter
    if (filters.dividendYield) {
      const minDividend = parseFloat(filters.dividendYield);
      results = results.filter(stock => stock.dividendYield >= minDividend);
    }

    // Apply market cap filter
    if (filters.marketCap) {
      results = results.filter(stock => {
        const marketCapValue = parseFloat(stock.marketCap.replace(/[TB]/g, ''));
        const unit = stock.marketCap.slice(-1);
        const valueInB = unit === 'T' ? marketCapValue * 1000 : marketCapValue;
        
        switch (filters.marketCap) {
          case 'small':
            return valueInB < 2;
          case 'mid':
            return valueInB >= 2 && valueInB <= 10;
          case 'large':
            return valueInB > 10;
          default:
            return true;
        }
      });
    }

    // Apply price range filters
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      results = results.filter(stock => stock.price >= minPrice);
    }

    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      results = results.filter(stock => stock.price <= maxPrice);
    }

    // Apply RSI filters
    if (filters.rsiMin) {
      const minRSI = parseFloat(filters.rsiMin);
      results = results.filter(stock => stock.rsi >= minRSI);
    }

    if (filters.rsiMax) {
      const maxRSI = parseFloat(filters.rsiMax);
      results = results.filter(stock => stock.rsi <= maxRSI);
    }

    // Apply moving average filters
    if (filters.above50MA) {
      results = results.filter(stock => stock.above50MA);
    }

    if (filters.above200MA) {
      results = results.filter(stock => stock.above200MA);
    }

    // Apply sector filter
    if (filters.sectors && filters.sectors.length > 0) {
      results = results.filter(stock => 
        filters.sectors.some(sector => 
          stock.sector.toLowerCase().includes(sector.toLowerCase())
        )
      );
    }

    setFilteredResults(results);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      peRatio: '',
      dividendYield: '',
      marketCap: '',
      minPrice: '',
      maxPrice: '',
      rsiMin: '',
      rsiMax: '',
      above50MA: false,
      above200MA: false,
      sectors: []
    });
  };

  const handleRemoveFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveScreen = () => {
    // This would typically open a modal to save the current screen
    console.log('Save current screen with filters:', filters);
  };

  const handleSaveNewScreen = (screenData) => {
    const newScreen = {
      id: Date.now(),
      ...screenData,
      filters: { ...filters }
    };
    setSavedScreens(prev => [...prev, newScreen]);
  };

  const handleLoadScreen = (screen) => {
    setFilters(screen.filters);
  };

  const handleDeleteScreen = (screenId) => {
    setSavedScreens(prev => prev.filter(screen => screen.id !== screenId));
  };

  const handleAddToWatchlist = (stockId) => {
    console.log('Add to watchlist:', stockId);
    // Implementation for adding to watchlist
  };

  const handleViewAnalysis = (stockId) => {
    navigate('/stock-analysis', { state: { stockId } });
  };

  const handleCompareStocks = (stockIds) => {
    console.log('Compare stocks:', stockIds);
    // Implementation for stock comparison
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Stock Screener</h1>
                <p className="text-muted-foreground mt-2">
                  Discover investment opportunities using advanced filtering criteria
                </p>
              </div>
              
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={toggleSidebar}
                iconName="Filter"
                iconPosition="left"
              >
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-1/4 min-w-[300px]">
              <div className="sticky top-24 space-y-6">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  onSaveScreen={handleSaveScreen}
                />
                <SavedScreens
                  savedScreens={savedScreens}
                  onLoadScreen={handleLoadScreen}
                  onDeleteScreen={handleDeleteScreen}
                  onSaveNewScreen={handleSaveNewScreen}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:w-3/4">
              <ActiveFilters
                filters={filters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearFilters}
                resultCount={filteredResults.length}
              />

              <ScreenerResults
                results={filteredResults}
                onAddToWatchlist={handleAddToWatchlist}
                onViewAnalysis={handleViewAnalysis}
                onCompareStocks={handleCompareStocks}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-background border-r border-border lg:hidden overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  iconName="X"
                />
              </div>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onSaveScreen={handleSaveScreen}
              />
              <div className="mt-6">
                <SavedScreens
                  savedScreens={savedScreens}
                  onLoadScreen={handleLoadScreen}
                  onDeleteScreen={handleDeleteScreen}
                  onSaveNewScreen={handleSaveNewScreen}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockScreener;