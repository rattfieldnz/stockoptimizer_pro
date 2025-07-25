import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'buy',
      action: 'Purchased',
      stock: 'AAPL',
      shares: 25,
      price: 175.32,
      timestamp: '2 hours ago',
      icon: 'Plus',
      iconColor: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 2,
      type: 'dividend',
      action: 'Dividend Received',
      stock: 'MSFT',
      amount: 156.75,
      timestamp: '1 day ago',
      icon: 'DollarSign',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'sell',
      action: 'Sold',
      stock: 'TSLA',
      shares: 10,
      price: 248.67,
      timestamp: '2 days ago',
      icon: 'Minus',
      iconColor: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 4,
      type: 'alert',
      action: 'Price Alert',
      stock: 'GOOGL',
      message: 'Target price reached',
      timestamp: '3 days ago',
      icon: 'Bell',
      iconColor: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 5,
      type: 'rebalance',
      action: 'Portfolio Rebalanced',
      message: 'Automatic rebalancing completed',
      timestamp: '1 week ago',
      icon: 'RotateCcw',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const formatActivityText = (activity) => {
    switch (activity.type) {
      case 'buy':
        return `${activity.shares} shares at $${activity.price}`;
      case 'sell':
        return `${activity.shares} shares at $${activity.price}`;
      case 'dividend':
        return `$${activity.amount}`;
      case 'alert': case'rebalance':
        return activity.message;
      default:
        return '';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`w-10 h-10 ${activity.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={16} className={activity.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {activity.action}
                  </span>
                  {activity.stock && (
                    <span className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {activity.stock}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1">
                {formatActivityText(activity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium">
          Load More Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;