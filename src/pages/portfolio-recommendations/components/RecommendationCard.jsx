import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation, onAccept, onModify, onLearnMore }) => {
  const getActionIcon = (action) => {
    switch (action) {
      case 'buy': return 'Plus';
      case 'sell': return 'Minus';
      case 'rebalance': return 'RotateCcw';
      default: return 'TrendingUp';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'buy': return 'text-success';
      case 'sell': return 'text-error';
      case 'rebalance': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(recommendation.action)} bg-current/10`}>
            <Icon name={getActionIcon(recommendation.action)} size={20} className={getActionColor(recommendation.action)} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{recommendation.symbol}</h3>
            <p className="text-sm text-muted-foreground">{recommendation.name}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(recommendation.risk)}`}>
          {recommendation.risk} Risk
        </div>
      </div>

      {/* Action Details */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium text-foreground capitalize">{recommendation.action}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{recommendation.quantity} shares</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm font-medium text-foreground">${recommendation.amount.toLocaleString()}</span>
        </div>
        <p className="text-sm text-muted-foreground">{recommendation.rationale}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-success">+{recommendation.expectedReturn}%</div>
          <div className="text-xs text-muted-foreground">Expected Return</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{recommendation.analystRating}/5</div>
          <div className="text-xs text-muted-foreground">Analyst Rating</div>
        </div>
      </div>

      {/* Impact */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={14} className="text-primary" />
          <span className="text-sm font-medium text-primary">Portfolio Impact</span>
        </div>
        <p className="text-sm text-muted-foreground">{recommendation.portfolioImpact}</p>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button 
          variant="default" 
          size="sm" 
          iconName="Check" 
          iconPosition="left"
          onClick={() => onAccept(recommendation)}
          className="flex-1"
        >
          Accept
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Edit" 
          iconPosition="left"
          onClick={() => onModify(recommendation)}
          className="flex-1"
        >
          Modify
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName="Info"
          onClick={() => onLearnMore(recommendation)}
        >
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;