import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OptimizedPortfolioPanel = ({ optimizedPortfolio, projectedValue, projectedMetrics, onAcceptAll }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Optimized Portfolio</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">${projectedValue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Projected Value</div>
        </div>
      </div>

      {/* Projected Improvements */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm font-medium text-success">Projected Improvements</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-success">+{projectedMetrics.returnImprovement}%</div>
            <div className="text-xs text-muted-foreground">Return Boost</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">+{projectedMetrics.dividendImprovement}%</div>
            <div className="text-xs text-muted-foreground">Dividend Boost</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">-{projectedMetrics.riskReduction}</div>
            <div className="text-xs text-muted-foreground">Risk Reduction</div>
          </div>
        </div>
      </div>

      {/* Optimized Holdings */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Recommended Holdings</h3>
        {optimizedPortfolio.map((holding) => (
          <div key={holding.symbol} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-accent-foreground">{holding.symbol.substring(0, 2)}</span>
              </div>
              <div>
                <div className="font-medium text-foreground">{holding.symbol}</div>
                <div className="text-sm text-muted-foreground">{holding.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-foreground">{holding.allocation}%</div>
              <div className="text-sm text-success">+${holding.projectedGain.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <Button 
        variant="default" 
        fullWidth 
        iconName="CheckCircle" 
        iconPosition="left"
        onClick={onAcceptAll}
      >
        Accept All Recommendations
      </Button>
    </div>
  );
};

export default OptimizedPortfolioPanel;