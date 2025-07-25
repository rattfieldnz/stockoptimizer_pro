import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Add Investment',
      description: 'Purchase new stocks or add to existing positions',
      icon: 'Plus',
      variant: 'default',
      action: () => console.log('Add Investment clicked')
    },
    {
      id: 2,
      title: 'Rebalance Portfolio',
      description: 'Optimize your asset allocation automatically',
      icon: 'RotateCcw',
      variant: 'outline',
      action: () => console.log('Rebalance clicked')
    },
    {
      id: 3,
      title: 'View Recommendations',
      description: 'Get AI-powered investment suggestions',
      icon: 'Target',
      variant: 'outline',
      action: () => console.log('Recommendations clicked')
    }
  ];

  const marketStats = [
    {
      id: 1,
      label: 'S&P 500',
      value: '4,567.89',
      change: '+0.85%',
      isPositive: true
    },
    {
      id: 2,
      label: 'NASDAQ',
      value: '14,234.56',
      change: '+1.23%',
      isPositive: true
    },
    {
      id: 3,
      label: 'DOW',
      value: '34,567.12',
      change: '-0.34%',
      isPositive: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <div key={action.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={action.icon} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                  <Button 
                    variant={action.variant} 
                    size="sm" 
                    onClick={action.action}
                    fullWidth
                  >
                    {action.title}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Market Overview</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            View More
          </button>
        </div>
        <div className="space-y-4">
          {marketStats.map((stat) => (
            <div key={stat.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.value}</div>
              </div>
              <div className={`text-sm font-medium ${stat.isPositive ? 'text-success' : 'text-error'}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Beta</span>
            <span className="text-sm font-medium text-foreground">1.12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
            <span className="text-sm font-medium text-foreground">1.45</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Drawdown</span>
            <span className="text-sm font-medium text-error">-8.34%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Volatility</span>
            <span className="text-sm font-medium text-foreground">12.8%</span>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Alerts</h3>
          <Icon name="Bell" size={18} className="text-muted-foreground" />
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Rebalancing Needed</p>
              <p className="text-xs text-muted-foreground">Your portfolio has drifted from target allocation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Dividend Payment</p>
              <p className="text-xs text-muted-foreground">MSFT dividend of $156.75 received</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;