import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MarketNewsWidget = () => {
  const newsItems = [
    {
      id: 1,
      title: "Federal Reserve Signals Potential Rate Cut in Q4",
      summary: "Fed officials hint at monetary policy adjustments amid economic indicators showing mixed signals for inflation and employment.",
      source: "Financial Times",
      timestamp: "2 hours ago",
      category: "Federal Reserve",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      impact: "positive"
    },
    {
      id: 2,
      title: "Tech Sector Shows Strong Q3 Earnings Growth",
      summary: "Major technology companies report better-than-expected quarterly results, driving sector-wide optimism among investors.",
      source: "MarketWatch",
      timestamp: "4 hours ago",
      category: "Technology",
      image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      impact: "positive"
    },
    {
      id: 3,
      title: "Healthcare Stocks Rally on Drug Approval News",
      summary: "FDA approvals for breakthrough treatments boost pharmaceutical sector performance across major indices.",
      source: "Reuters",
      timestamp: "6 hours ago",
      category: "Healthcare",
      image: "https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      impact: "positive"
    },
    {
      id: 4,
      title: "Energy Sector Faces Volatility Amid Supply Concerns",
      summary: "Oil prices fluctuate as geopolitical tensions and supply chain disruptions create uncertainty in energy markets.",
      source: "Bloomberg",
      timestamp: "8 hours ago",
      category: "Energy",
      image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      impact: "negative"
    }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Market News</h3>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            View All
          </button>
          <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="group cursor-pointer">
            <div className="flex space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
              {/* News Image */}
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              {/* News Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {news.title}
                  </h4>
                  <Icon 
                    name={getImpactIcon(news.impact)} 
                    size={14} 
                    className={`ml-2 flex-shrink-0 ${getImpactColor(news.impact)}`} 
                  />
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {news.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">{news.source}</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                    <span className="text-muted-foreground">{news.timestamp}</span>
                  </div>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {news.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium flex items-center space-x-2">
            <span>Read More Market News</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketNewsWidget;