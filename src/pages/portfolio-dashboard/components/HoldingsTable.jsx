import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HoldingsTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  const holdings = [
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 150,
      currentPrice: 175.32,
      marketValue: 26298.00,
      costBasis: 162.45,
      gainLoss: 1931.05,
      gainLossPercent: 7.93,
      dividendYield: 0.52,
      sector: 'Technology'
    },
    {
      id: 2,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 85,
      currentPrice: 342.67,
      marketValue: 29126.95,
      costBasis: 318.22,
      gainLoss: 2077.25,
      gainLossPercent: 7.68,
      dividendYield: 0.73,
      sector: 'Technology'
    },
    {
      id: 3,
      symbol: 'JNJ',
      name: 'Johnson & Johnson',
      shares: 120,
      currentPrice: 158.94,
      marketValue: 19072.80,
      costBasis: 165.33,
      gainLoss: -766.80,
      gainLossPercent: -3.87,
      dividendYield: 3.12,
      sector: 'Healthcare'
    },
    {
      id: 4,
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      shares: 75,
      currentPrice: 145.78,
      marketValue: 10933.50,
      costBasis: 138.92,
      gainLoss: 514.50,
      gainLossPercent: 4.94,
      dividendYield: 2.85,
      sector: 'Financial Services'
    },
    {
      id: 5,
      symbol: 'PG',
      name: 'Procter & Gamble Co.',
      shares: 90,
      currentPrice: 152.43,
      marketValue: 13718.70,
      costBasis: 147.89,
      gainLoss: 408.60,
      gainLossPercent: 3.07,
      dividendYield: 2.41,
      sector: 'Consumer Goods'
    }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHoldings = React.useMemo(() => {
    if (!sortConfig.key) return holdings;
    
    return [...holdings].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [holdings, sortConfig]);

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
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Current Holdings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('symbol')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Symbol</span>
                  {getSortIcon('symbol')}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('shares')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Shares</span>
                  {getSortIcon('shares')}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('currentPrice')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Price</span>
                  {getSortIcon('currentPrice')}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('marketValue')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Market Value</span>
                  {getSortIcon('marketValue')}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('gainLoss')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Gain/Loss</span>
                  {getSortIcon('gainLoss')}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                <button 
                  onClick={() => handleSort('dividendYield')}
                  className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200"
                >
                  <span>Dividend Yield</span>
                  {getSortIcon('dividendYield')}
                </button>
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding) => (
              <tr key={holding.id} className="border-b border-border hover:bg-muted/30 transition-colors duration-200">
                <td className="p-4">
                  <div>
                    <div className="font-mono font-medium text-foreground">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holding.name}</div>
                  </div>
                </td>
                <td className="p-4 text-foreground">{holding.shares.toLocaleString()}</td>
                <td className="p-4 text-foreground">${holding.currentPrice.toFixed(2)}</td>
                <td className="p-4 text-foreground">${holding.marketValue.toLocaleString()}</td>
                <td className="p-4">
                  <div className={holding.gainLoss >= 0 ? 'text-success' : 'text-error'}>
                    <div className="font-medium">
                      {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toFixed(2)}
                    </div>
                    <div className="text-sm">
                      ({holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%)
                    </div>
                  </div>
                </td>
                <td className="p-4 text-foreground">{holding.dividendYield.toFixed(2)}%</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="TrendingUp">
                      Analyze
                    </Button>
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedHoldings.map((holding) => (
          <div key={holding.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-mono font-medium text-foreground">{holding.symbol}</div>
                <div className="text-sm text-muted-foreground">{holding.name}</div>
              </div>
              <div className={`text-right ${holding.gainLoss >= 0 ? 'text-success' : 'text-error'}`}>
                <div className="font-medium">
                  {holding.gainLoss >= 0 ? '+' : ''}${holding.gainLoss.toFixed(2)}
                </div>
                <div className="text-sm">
                  ({holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%)
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Shares:</span>
                <span className="ml-2 text-foreground">{holding.shares.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Price:</span>
                <span className="ml-2 text-foreground">${holding.currentPrice.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Value:</span>
                <span className="ml-2 text-foreground">${holding.marketValue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Yield:</span>
                <span className="ml-2 text-foreground">{holding.dividendYield.toFixed(2)}%</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Button variant="outline" size="sm" iconName="TrendingUp" fullWidth>
                Analyze
              </Button>
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoldingsTable;