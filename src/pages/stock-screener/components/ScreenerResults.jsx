import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScreenerResults = ({ results, onAddToWatchlist, onViewAnalysis, onCompareStocks }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });
  const [selectedStocks, setSelectedStocks] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedResults = React.useMemo(() => {
    const sortableResults = [...results];
    if (sortConfig.key) {
      sortableResults.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableResults;
  }, [results, sortConfig]);

  const handleSelectStock = (stockId) => {
    setSelectedStocks(prev => 
      prev.includes(stockId) 
        ? prev.filter(id => id !== stockId)
        : [...prev, stockId]
    );
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-success bg-success/10';
    if (score >= 6) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-muted/50 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Screening Results ({results.length})
          </h3>
          <div className="flex items-center space-x-2">
            {selectedStocks.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCompareStocks(selectedStocks)}
                iconName="BarChart3"
                iconPosition="left"
              >
                Compare ({selectedStocks.length})
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 w-12">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStocks(results.map(r => r.id));
                    } else {
                      setSelectedStocks([]);
                    }
                  }}
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>Symbol</span>
                  {getSortIcon('symbol')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('companyName')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>Company</span>
                  {getSortIcon('companyName')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('price')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>Price</span>
                  {getSortIcon('price')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('peRatio')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>P/E</span>
                  {getSortIcon('peRatio')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('dividendYield')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>Dividend</span>
                  {getSortIcon('dividendYield')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('marketCap')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>Market Cap</span>
                  {getSortIcon('marketCap')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('score')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                >
                  <span>Score</span>
                  {getSortIcon('score')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((stock) => (
              <tr key={stock.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedStocks.includes(stock.id)}
                    onChange={() => handleSelectStock(stock.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.exchange}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">{stock.companyName}</div>
                  <div className="text-sm text-muted-foreground">{stock.sector}</div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">${stock.price.toFixed(2)}</div>
                  <div className={`text-sm ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </div>
                </td>
                <td className="p-4 text-foreground">{stock.peRatio}</td>
                <td className="p-4 text-foreground">{stock.dividendYield}%</td>
                <td className="p-4 text-foreground">${stock.marketCap}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(stock.score)}`}>
                    {stock.score}/10
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onAddToWatchlist(stock.id)}
                      iconName="Plus"
                      className="text-muted-foreground hover:text-foreground"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewAnalysis(stock.id)}
                      iconName="BarChart3"
                      className="text-muted-foreground hover:text-foreground"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        {sortedResults.map((stock) => (
          <div key={stock.id} className="border-b border-border p-4 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  checked={selectedStocks.includes(stock.id)}
                  onChange={() => handleSelectStock(stock.id)}
                />
                <div>
                  <div className="font-medium text-foreground">{stock.symbol}</div>
                  <div className="text-sm text-muted-foreground">{stock.companyName}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(stock.score)}`}>
                {stock.score}/10
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-medium text-foreground">${stock.price.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Change</div>
                <div className={`font-medium ${stock.change >= 0 ? 'text-success' : 'text-error'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">P/E Ratio</div>
                <div className="font-medium text-foreground">{stock.peRatio}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Dividend</div>
                <div className="font-medium text-foreground">{stock.dividendYield}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {stock.sector} • ${stock.marketCap}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onAddToWatchlist(stock.id)}
                  iconName="Plus"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewAnalysis(stock.id)}
                  iconName="BarChart3"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No stocks found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default ScreenerResults;