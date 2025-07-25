import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalystRecommendations = ({ selectedStock }) => {
  const [activeView, setActiveView] = useState('recommendations');

  const recommendations = [
    {
      id: 1,
      firm: "Goldman Sachs",
      analyst: "Sarah Johnson",
      rating: "Buy",
      priceTarget: 210.00,
      currentPrice: 188.75,
      upside: 11.3,
      date: "2025-01-20",
      confidence: "High",
      summary: `Strong fundamentals and market position support continued growth. \nRevenue diversification and margin expansion expected.`
    },
    {
      id: 2,
      firm: "Morgan Stanley",
      analyst: "Michael Chen",
      rating: "Overweight",
      priceTarget: 205.00,
      currentPrice: 188.75,
      upside: 8.6,
      date: "2025-01-18",
      confidence: "Medium",
      summary: `Positive outlook on sector trends and company execution. \nSlight concerns about competitive pressures.`
    },
    {
      id: 3,
      firm: "J.P. Morgan",
      analyst: "Emily Rodriguez",
      rating: "Neutral",
      priceTarget: 190.00,
      currentPrice: 188.75,
      upside: 0.7,
      date: "2025-01-15",
      confidence: "Medium",
      summary: `Fair valuation at current levels. \nWaiting for clearer growth catalysts before upgrading.`
    },
    {
      id: 4,
      firm: "Bank of America",
      analyst: "David Kim",
      rating: "Buy",
      priceTarget: 215.00,
      currentPrice: 188.75,
      upside: 13.9,
      date: "2025-01-12",
      confidence: "High",
      summary: `Exceptional management team and strong competitive moat. \nExpected to outperform in current market conditions.`
    },
    {
      id: 5,
      firm: "Citigroup",
      analyst: "Lisa Thompson",
      rating: "Hold",
      priceTarget: 185.00,
      currentPrice: 188.75,
      upside: -2.0,
      date: "2025-01-10",
      confidence: "Low",
      summary: `Near-term headwinds may pressure performance. \nLong-term prospects remain intact but timing uncertain.`
    }
  ];

  const priceTargets = [
    { range: "$220+", count: 2, percentage: 12 },
    { range: "$200-220", count: 8, percentage: 47 },
    { range: "$180-200", count: 5, percentage: 29 },
    { range: "$160-180", count: 2, percentage: 12 }
  ];

  const ratingDistribution = [
    { rating: "Strong Buy", count: 3, percentage: 18, color: "bg-success" },
    { rating: "Buy", count: 7, percentage: 41, color: "bg-success/70" },
    { rating: "Hold", count: 5, percentage: 29, color: "bg-warning" },
    { rating: "Sell", count: 2, percentage: 12, color: "bg-error" }
  ];

  const getRatingColor = (rating) => {
    switch (rating.toLowerCase()) {
      case 'buy': case'strong buy':
        return 'text-success bg-success/10 border-success/20';
      case 'overweight':
        return 'text-success bg-success/10 border-success/20';
      case 'hold': case'neutral':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'sell': case'underweight':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getConfidenceIcon = (confidence) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return <Icon name="TrendingUp" size={14} className="text-success" />;
      case 'medium':
        return <Icon name="Minus" size={14} className="text-warning" />;
      case 'low':
        return <Icon name="TrendingDown" size={14} className="text-error" />;
      default:
        return <Icon name="Help" size={14} className="text-muted-foreground" />;
    }
  };

  const averagePriceTarget = recommendations.reduce((sum, rec) => sum + rec.priceTarget, 0) / recommendations.length;
  const averageUpside = ((averagePriceTarget - selectedStock?.currentPrice) / selectedStock?.currentPrice) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Analyst Recommendations</h2>
          <p className="text-sm text-muted-foreground">
            Professional analysis and price targets for {selectedStock?.symbol}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={activeView === 'recommendations' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('recommendations')}
          >
            Recommendations
          </Button>
          <Button
            variant={activeView === 'summary' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView('summary')}
          >
            Summary
          </Button>
        </div>
      </div>

      {activeView === 'recommendations' ? (
        <>
          {/* Consensus Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Avg Price Target</span>
              </div>
              <p className="text-2xl font-bold text-foreground">${averagePriceTarget.toFixed(2)}</p>
              <p className={`text-sm font-medium ${averageUpside >= 0 ? 'text-success' : 'text-error'}`}>
                {averageUpside >= 0 ? '+' : ''}{averageUpside.toFixed(1)}% upside
              </p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Total Analysts</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{recommendations.length}</p>
              <p className="text-sm text-muted-foreground">Covering this stock</p>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Last Updated</span>
              </div>
              <p className="text-2xl font-bold text-foreground">Jan 20</p>
              <p className="text-sm text-muted-foreground">2025</p>
            </div>
          </div>

          {/* Individual Recommendations */}
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-muted/20 rounded-lg p-4 border border-border/50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-foreground">{rec.firm}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRatingColor(rec.rating)}`}>
                        {rec.rating}
                      </span>
                      <div className="flex items-center space-x-1">
                        {getConfidenceIcon(rec.confidence)}
                        <span className="text-xs text-muted-foreground">{rec.confidence}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{rec.analyst}</p>
                    <p className="text-sm text-foreground whitespace-pre-line">{rec.summary}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-0 lg:space-y-2 text-right">
                    <div>
                      <p className="text-sm text-muted-foreground">Price Target</p>
                      <p className="text-lg font-bold text-foreground">${rec.priceTarget.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Upside</p>
                      <p className={`text-lg font-bold ${rec.upside >= 0 ? 'text-success' : 'text-error'}`}>
                        {rec.upside >= 0 ? '+' : ''}{rec.upside.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{new Date(rec.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Rating Distribution */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {ratingDistribution.map((rating, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium text-foreground">{rating.rating}</div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${rating.color}`}
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-muted-foreground text-right">{rating.count}</div>
                  <div className="w-12 text-sm text-muted-foreground text-right">{rating.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Target Distribution */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Price Target Distribution</h3>
            <div className="space-y-3">
              {priceTargets.map((target, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium text-foreground">{target.range}</div>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${target.percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-muted-foreground text-right">{target.count}</div>
                  <div className="w-12 text-sm text-muted-foreground text-right">{target.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalystRecommendations;