import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummaryCards = () => {
  const summaryData = [
    {
      id: 1,
      title: "Total Portfolio Value",
      value: "$127,450.32",
      change: "+$2,340.15",
      changePercent: "+1.87%",
      isPositive: true,
      icon: "DollarSign",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      title: "Daily Change",
      value: "+$1,245.67",
      change: "+0.98%",
      changePercent: "vs yesterday",
      isPositive: true,
      icon: "TrendingUp",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      title: "Dividend Yield",
      value: "3.42%",
      change: "Annual",
      changePercent: "$4,366.60",
      isPositive: true,
      icon: "Percent",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 4,
      title: "Total Return",
      value: "+18.45%",
      change: "+$19,890.23",
      changePercent: "All time",
      isPositive: true,
      icon: "BarChart3",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData.map((item) => (
        <div key={item.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item.icon} size={24} className={item.iconColor} />
            </div>
            <div className={`text-sm font-medium ${item.isPositive ? 'text-success' : 'text-error'}`}>
              {item.changePercent}
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{item.title}</h3>
            <div className="text-2xl font-bold text-foreground">{item.value}</div>
            <div className={`text-sm ${item.isPositive ? 'text-success' : 'text-error'}`}>
              {item.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioSummaryCards;