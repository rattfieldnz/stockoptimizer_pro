import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FinancialMetrics = ({ selectedStock }) => {
  const [activeTab, setActiveTab] = useState('valuation');

  const tabs = [
    { id: 'valuation', label: 'Valuation', icon: 'Calculator' },
    { id: 'profitability', label: 'Profitability', icon: 'TrendingUp' },
    { id: 'dividend', label: 'Dividend', icon: 'DollarSign' },
    { id: 'growth', label: 'Growth', icon: 'BarChart3' }
  ];

  const valuationMetrics = [
    { label: 'Price-to-Earnings (P/E)', value: '24.5', change: '+2.1%', trend: 'up', benchmark: '22.3' },
    { label: 'Price-to-Book (P/B)', value: '3.2', change: '-0.5%', trend: 'down', benchmark: '3.4' },
    { label: 'Price-to-Sales (P/S)', value: '8.7', change: '+1.8%', trend: 'up', benchmark: '7.9' },
    { label: 'Enterprise Value/EBITDA', value: '18.9', change: '+0.3%', trend: 'up', benchmark: '18.2' },
    { label: 'Price/Earnings to Growth (PEG)', value: '1.4', change: '-0.2%', trend: 'down', benchmark: '1.5' },
    { label: 'Market Cap', value: '$2.1T', change: '+3.2%', trend: 'up', benchmark: 'N/A' }
  ];

  const profitabilityMetrics = [
    { label: 'Gross Margin', value: '42.5%', change: '+1.2%', trend: 'up', benchmark: '38.7%' },
    { label: 'Operating Margin', value: '28.3%', change: '+0.8%', trend: 'up', benchmark: '25.1%' },
    { label: 'Net Profit Margin', value: '21.7%', change: '+0.5%', trend: 'up', benchmark: '18.9%' },
    { label: 'Return on Equity (ROE)', value: '31.2%', change: '+2.1%', trend: 'up', benchmark: '28.4%' },
    { label: 'Return on Assets (ROA)', value: '18.9%', change: '+1.3%', trend: 'up', benchmark: '16.7%' },
    { label: 'Return on Investment (ROI)', value: '24.6%', change: '+1.8%', trend: 'up', benchmark: '22.1%' }
  ];

  const dividendMetrics = [
    { label: 'Dividend Yield', value: '2.8%', change: '+0.1%', trend: 'up', benchmark: '2.5%' },
    { label: 'Dividend Per Share', value: '$4.25', change: '+5.2%', trend: 'up', benchmark: '$3.89' },
    { label: 'Payout Ratio', value: '32.1%', change: '-1.2%', trend: 'down', benchmark: '35.4%' },
    { label: 'Dividend Growth Rate', value: '8.7%', change: '+2.3%', trend: 'up', benchmark: '6.2%' },
    { label: 'Ex-Dividend Date', value: 'Mar 15, 2025', change: 'N/A', trend: 'neutral', benchmark: 'N/A' },
    { label: 'Payment Date', value: 'Mar 28, 2025', change: 'N/A', trend: 'neutral', benchmark: 'N/A' }
  ];

  const growthMetrics = [
    { label: 'Revenue Growth (YoY)', value: '12.4%', change: '+1.8%', trend: 'up', benchmark: '9.7%' },
    { label: 'Earnings Growth (YoY)', value: '18.7%', change: '+3.2%', trend: 'up', benchmark: '14.2%' },
    { label: 'Book Value Growth', value: '15.3%', change: '+2.1%', trend: 'up', benchmark: '12.8%' },
    { label: 'Cash Flow Growth', value: '21.9%', change: '+4.5%', trend: 'up', benchmark: '16.4%' },
    { label: '5-Year Revenue CAGR', value: '14.2%', change: 'N/A', trend: 'neutral', benchmark: '11.8%' },
    { label: '5-Year Earnings CAGR', value: '19.6%', change: 'N/A', trend: 'neutral', benchmark: '15.9%' }
  ];

  const getMetricsData = () => {
    switch (activeTab) {
      case 'valuation': return valuationMetrics;
      case 'profitability': return profitabilityMetrics;
      case 'dividend': return dividendMetrics;
      case 'growth': return growthMetrics;
      default: return valuationMetrics;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <Icon name="TrendingUp" size={16} className="text-success" />;
      case 'down': return <Icon name="TrendingDown" size={16} className="text-error" />;
      default: return <Icon name="Minus" size={16} className="text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Financial Metrics</h2>
          <p className="text-sm text-muted-foreground">
            Comprehensive financial analysis for {selectedStock?.symbol}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {getMetricsData().map((metric, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">{metric.label}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                {metric.change !== 'N/A' && (
                  <p className={`text-xs font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change} vs last quarter
                  </p>
                )}
              </div>
              
              {metric.benchmark !== 'N/A' && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Industry Avg</p>
                  <p className="text-sm font-medium text-foreground">{metric.benchmark}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Analysis Summary</h4>
            <p className="text-sm text-muted-foreground">
              {selectedStock?.symbol} shows strong financial performance across key metrics. 
              The company demonstrates solid profitability with above-average margins and consistent 
              dividend growth. Valuation appears reasonable compared to industry benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetrics;