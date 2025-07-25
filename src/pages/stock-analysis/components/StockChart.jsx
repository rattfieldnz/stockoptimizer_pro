import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StockChart = ({ stockData, selectedStock }) => {
  const [timeframe, setTimeframe] = useState('1M');
  const [chartType, setChartType] = useState('price');
  const [showIndicators, setShowIndicators] = useState(false);

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '1Y', value: '1Y' },
    { label: '5Y', value: '5Y' }
  ];

  const chartTypes = [
    { label: 'Price', value: 'price', icon: 'TrendingUp' },
    { label: 'Volume', value: 'volume', icon: 'BarChart3' },
    { label: 'Candlestick', value: 'candlestick', icon: 'Activity' }
  ];

  const priceData = [
    { date: '2025-01-01', price: 150.25, volume: 2500000 },
    { date: '2025-01-08', price: 152.80, volume: 2800000 },
    { date: '2025-01-15', price: 148.90, volume: 3200000 },
    { date: '2025-01-22', price: 155.40, volume: 2900000 },
    { date: '2025-01-29', price: 158.75, volume: 3100000 },
    { date: '2025-02-05', price: 162.30, volume: 2700000 },
    { date: '2025-02-12', price: 159.85, volume: 3400000 },
    { date: '2025-02-19', price: 164.20, volume: 2600000 },
    { date: '2025-02-26', price: 167.90, volume: 3000000 },
    { date: '2025-03-05', price: 171.45, volume: 3300000 },
    { date: '2025-03-12', price: 169.75, volume: 2800000 },
    { date: '2025-03-19', price: 173.60, volume: 3500000 },
    { date: '2025-03-26', price: 176.25, volume: 3200000 },
    { date: '2025-04-02', price: 179.80, volume: 2900000 },
    { date: '2025-04-09', price: 182.45, volume: 3100000 },
    { date: '2025-04-16', price: 185.90, volume: 3400000 },
    { date: '2025-04-23', price: 188.75, volume: 3000000 },
    { date: '2025-04-30', price: 192.30, volume: 3600000 }
  ];

  const formatPrice = (value) => `$${value.toFixed(2)}`;
  const formatVolume = (value) => `${(value / 1000000).toFixed(1)}M`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Price' ? formatPrice(entry.value) : formatVolume(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Chart Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {selectedStock?.symbol} - Price Chart
          </h2>
          <p className="text-sm text-muted-foreground">
            Current: {formatPrice(selectedStock?.currentPrice)} 
            <span className={`ml-2 ${selectedStock?.change >= 0 ? 'text-success' : 'text-error'}`}>
              {selectedStock?.change >= 0 ? '+' : ''}{selectedStock?.change?.toFixed(2)} 
              ({selectedStock?.changePercent?.toFixed(2)}%)
            </span>
          </p>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors duration-200 ${
                  timeframe === tf.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>

          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`px-3 py-1 text-xs font-medium rounded flex items-center space-x-1 transition-colors duration-200 ${
                  chartType === type.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={type.icon} size={14} />
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Indicators Toggle */}
          <Button
            variant={showIndicators ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowIndicators(!showIndicators)}
            iconName="Settings"
            iconPosition="left"
          >
            Indicators
          </Button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'volume' ? (
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatVolume}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="volume" 
                fill="var(--color-accent)" 
                name="Volume"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatPrice}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={false}
                name="Price"
                activeDot={{ r: 4, fill: 'var(--color-primary)' }}
              />
              {showIndicators && (
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="var(--color-warning)" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Moving Average"
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Tools */}
      <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Real-time data with 15-minute delay</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="ghost" size="sm" iconName="Share">
            Share
          </Button>
          <Button variant="ghost" size="sm" iconName="Maximize2">
            Fullscreen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StockChart;