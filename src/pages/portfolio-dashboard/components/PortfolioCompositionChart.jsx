import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PortfolioCompositionChart = () => {
  const portfolioData = [
    { name: 'Technology', value: 35.2, amount: 44850.32, color: '#3B82F6' },
    { name: 'Healthcare', value: 22.8, length: 29058.47, color: '#10B981' },
    { name: 'Financial Services', value: 18.5, amount: 23578.31, color: '#8B5CF6' },
    { name: 'Consumer Goods', value: 12.3, amount: 15676.29, color: '#F59E0B' },
    { name: 'Energy', value: 7.1, amount: 9048.58, color: '#EF4444' },
    { name: 'Real Estate', value: 4.1, amount: 5238.35, color: '#06B6D4' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-modal">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            ${data.amount?.toLocaleString() || '0'} ({data.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Portfolio Composition</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View Details
        </button>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 space-y-3">
        {portfolioData.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-foreground">{item.name}</span>
            </div>
            <div className="text-sm font-medium text-foreground">
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioCompositionChart;