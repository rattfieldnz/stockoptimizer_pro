import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StockSelector = ({ selectedStock, onStockSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const popularStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 188.75, change: 2.45, changePercent: 1.32 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 425.30, change: -3.20, changePercent: -0.75 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.85, change: 1.85, changePercent: 1.31 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 4.12, changePercent: 2.37 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.60, change: -8.45, changePercent: -3.33 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 512.40, change: 12.30, changePercent: 2.46 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.20, change: 15.80, changePercent: 1.84 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.75, change: -2.15, changePercent: -0.44 }
  ];

  const searchResults = popularStocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockSelect = (stock) => {
    onStockSelect(stock);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Current Stock Display */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedStock?.symbol}</h1>
            <p className="text-sm text-muted-foreground">{selectedStock?.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">${selectedStock?.price}</p>
            <p className={`text-sm font-medium ${selectedStock?.change >= 0 ? 'text-success' : 'text-error'}`}>
              {selectedStock?.change >= 0 ? '+' : ''}{selectedStock?.change} ({selectedStock?.changePercent}%)
            </p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-3">
          {/* Stock Search */}
          <div className="relative">
            <Input
              type="search"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchOpen(true)}
              className="w-64"
            />
            
            {isSearchOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsSearchOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-20 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="py-1">
                      {searchResults.map((stock) => (
                        <button
                          key={stock.symbol}
                          onClick={() => handleStockSelect(stock)}
                          className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-foreground">{stock.symbol}</div>
                            <div className="text-sm text-muted-foreground">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-foreground">${stock.price}</div>
                            <div className={`text-sm ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      No stocks found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add to Portfolio
          </Button>
          <Button variant="outline" iconName="Bookmark" iconPosition="left">
            Watchlist
          </Button>
          <Button variant="outline" iconName="BarChart3" iconPosition="left">
            Compare
          </Button>
        </div>
      </div>

      {/* Popular Stocks Quick Access */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Popular Stocks</h3>
        <div className="flex flex-wrap gap-2">
          {popularStocks.slice(0, 6).map((stock) => (
            <button
              key={stock.symbol}
              onClick={() => handleStockSelect(stock)}
              className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                selectedStock?.symbol === stock.symbol
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted text-muted-foreground border-border hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{stock.symbol}</span>
                <span className={`text-xs ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockSelector;