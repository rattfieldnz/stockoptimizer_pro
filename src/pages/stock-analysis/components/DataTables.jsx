import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataTables = ({ selectedStock }) => {
  const [activeTable, setActiveTable] = useState('earnings');

  const tables = [
    { id: 'earnings', label: 'Quarterly Earnings', icon: 'BarChart3' },
    { id: 'dividends', label: 'Dividend History', icon: 'DollarSign' },
    { id: 'peers', label: 'Peer Comparison', icon: 'Users' }
  ];

  const earningsData = [
    {
      quarter: 'Q4 2024',
      date: '2025-01-15',
      epsActual: 2.45,
      epsEstimate: 2.38,
      surprise: 2.9,
      revenue: 28.5,
      revenueGrowth: 12.4,
      guidance: 'Beat'
    },
    {
      quarter: 'Q3 2024',
      date: '2024-10-15',
      epsActual: 2.32,
      epsEstimate: 2.29,
      surprise: 1.3,
      revenue: 26.8,
      revenueGrowth: 8.7,
      guidance: 'Met'
    },
    {
      quarter: 'Q2 2024',
      date: '2024-07-15',
      epsActual: 2.18,
      epsEstimate: 2.25,
      surprise: -3.1,
      revenue: 25.2,
      revenueGrowth: 6.2,
      guidance: 'Miss'
    },
    {
      quarter: 'Q1 2024',
      date: '2024-04-15',
      epsActual: 2.05,
      epsEstimate: 2.01,
      surprise: 2.0,
      revenue: 24.1,
      revenueGrowth: 9.8,
      guidance: 'Beat'
    },
    {
      quarter: 'Q4 2023',
      date: '2024-01-15',
      epsActual: 1.98,
      epsEstimate: 1.95,
      surprise: 1.5,
      revenue: 23.7,
      revenueGrowth: 11.2,
      guidance: 'Beat'
    }
  ];

  const dividendData = [
    {
      exDate: '2024-12-15',
      payDate: '2024-12-28',
      amount: 1.25,
      yield: 2.8,
      growth: 8.7,
      type: 'Regular'
    },
    {
      exDate: '2024-09-15',
      payDate: '2024-09-28',
      amount: 1.15,
      yield: 2.6,
      growth: 7.5,
      type: 'Regular'
    },
    {
      exDate: '2024-06-15',
      payDate: '2024-06-28',
      amount: 1.07,
      yield: 2.5,
      growth: 6.0,
      type: 'Regular'
    },
    {
      exDate: '2024-03-15',
      payDate: '2024-03-28',
      amount: 1.01,
      yield: 2.4,
      growth: 5.2,
      type: 'Regular'
    },
    {
      exDate: '2023-12-15',
      payDate: '2023-12-28',
      amount: 0.96,
      yield: 2.3,
      growth: 4.3,
      type: 'Regular'
    }
  ];

  const peerData = [
    {
      symbol: selectedStock?.symbol,
      name: selectedStock?.name,
      price: 188.75,
      marketCap: 2100,
      pe: 24.5,
      pb: 3.2,
      roe: 31.2,
      divYield: 2.8,
      revenue: 28.5,
      isCurrent: true
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 425.30,
      marketCap: 3200,
      pe: 28.7,
      pb: 4.1,
      roe: 29.8,
      divYield: 2.1,
      revenue: 62.0,
      isCurrent: false
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.85,
      marketCap: 1800,
      pe: 22.1,
      pb: 2.9,
      roe: 27.4,
      divYield: 0.0,
      revenue: 74.6,
      isCurrent: false
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 178.25,
      marketCap: 1900,
      pe: 35.2,
      pb: 5.8,
      roe: 18.9,
      divYield: 0.0,
      revenue: 143.3,
      isCurrent: false
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 512.40,
      marketCap: 1300,
      pe: 21.8,
      pb: 3.7,
      roe: 24.6,
      divYield: 1.2,
      revenue: 40.1,
      isCurrent: false
    }
  ];

  const getSurpriseColor = (surprise) => {
    if (surprise > 0) return 'text-success';
    if (surprise < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getGuidanceColor = (guidance) => {
    switch (guidance.toLowerCase()) {
      case 'beat': return 'text-success bg-success/10 border-success/20';
      case 'miss': return 'text-error bg-error/10 border-error/20';
      default: return 'text-warning bg-warning/10 border-warning/20';
    }
  };

  const renderEarningsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-foreground">Quarter</th>
            <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">EPS Actual</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">EPS Estimate</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Surprise %</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Revenue (B)</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Growth %</th>
            <th className="text-center py-3 px-4 font-medium text-foreground">Guidance</th>
          </tr>
        </thead>
        <tbody>
          {earningsData.map((row, index) => (
            <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
              <td className="py-3 px-4 font-medium text-foreground">{row.quarter}</td>
              <td className="py-3 px-4 text-muted-foreground">{new Date(row.date).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-right font-medium text-foreground">${row.epsActual}</td>
              <td className="py-3 px-4 text-right text-muted-foreground">${row.epsEstimate}</td>
              <td className={`py-3 px-4 text-right font-medium ${getSurpriseColor(row.surprise)}`}>
                {row.surprise > 0 ? '+' : ''}{row.surprise}%
              </td>
              <td className="py-3 px-4 text-right font-medium text-foreground">${row.revenue}</td>
              <td className="py-3 px-4 text-right text-success font-medium">+{row.revenueGrowth}%</td>
              <td className="py-3 px-4 text-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getGuidanceColor(row.guidance)}`}>
                  {row.guidance}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDividendTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-foreground">Ex-Date</th>
            <th className="text-left py-3 px-4 font-medium text-foreground">Pay Date</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Amount</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Yield %</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Growth %</th>
            <th className="text-center py-3 px-4 font-medium text-foreground">Type</th>
          </tr>
        </thead>
        <tbody>
          {dividendData.map((row, index) => (
            <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
              <td className="py-3 px-4 font-medium text-foreground">{new Date(row.exDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-muted-foreground">{new Date(row.payDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 text-right font-medium text-foreground">${row.amount}</td>
              <td className="py-3 px-4 text-right text-foreground">{row.yield}%</td>
              <td className="py-3 px-4 text-right text-success font-medium">+{row.growth}%</td>
              <td className="py-3 px-4 text-center">
                <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                  {row.type}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPeerTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-medium text-foreground">Symbol</th>
            <th className="text-left py-3 px-4 font-medium text-foreground">Company</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Price</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Market Cap (B)</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">P/E</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">P/B</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">ROE %</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Div Yield %</th>
            <th className="text-right py-3 px-4 font-medium text-foreground">Revenue (B)</th>
          </tr>
        </thead>
        <tbody>
          {peerData.map((row, index) => (
            <tr 
              key={index} 
              className={`border-b border-border/50 hover:bg-muted/20 ${
                row.isCurrent ? 'bg-primary/5 border-primary/20' : ''
              }`}
            >
              <td className={`py-3 px-4 font-bold ${row.isCurrent ? 'text-primary' : 'text-foreground'}`}>
                {row.symbol}
              </td>
              <td className="py-3 px-4 text-muted-foreground">{row.name}</td>
              <td className="py-3 px-4 text-right font-medium text-foreground">${row.price}</td>
              <td className="py-3 px-4 text-right text-foreground">${row.marketCap}</td>
              <td className="py-3 px-4 text-right text-foreground">{row.pe}</td>
              <td className="py-3 px-4 text-right text-foreground">{row.pb}</td>
              <td className="py-3 px-4 text-right text-success font-medium">{row.roe}%</td>
              <td className="py-3 px-4 text-right text-foreground">{row.divYield}%</td>
              <td className="py-3 px-4 text-right font-medium text-foreground">${row.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderActiveTable = () => {
    switch (activeTable) {
      case 'earnings': return renderEarningsTable();
      case 'dividends': return renderDividendTable();
      case 'peers': return renderPeerTable();
      default: return renderEarningsTable();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Financial Data</h2>
          <p className="text-sm text-muted-foreground">
            Detailed financial information for {selectedStock?.symbol}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>

      {/* Table Tabs */}
      <div className="flex flex-wrap border-b border-border mb-6">
        {tables.map((table) => (
          <button
            key={table.id}
            onClick={() => setActiveTable(table.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTable === table.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={table.icon} size={16} />
            <span>{table.label}</span>
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="bg-muted/20 rounded-lg border border-border/50">
        {renderActiveTable()}
      </div>

      {/* Table Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-border space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Data updated as of {new Date().toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page 1 of 1</span>
          <Button variant="ghost" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTables;