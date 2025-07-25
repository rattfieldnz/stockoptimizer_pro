import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const NewsAndInsights = ({ selectedStock }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All News', count: 24 },
    { id: 'earnings', label: 'Earnings', count: 8 },
    { id: 'analyst', label: 'Analyst', count: 6 },
    { id: 'market', label: 'Market', count: 10 }
  ];

  const newsItems = [
    {
      id: 1,
      title: "Q4 Earnings Beat Expectations with Strong Revenue Growth",
      summary: `${selectedStock?.symbol} reported quarterly earnings that exceeded analyst expectations, \ndriven by strong performance in key business segments and improved operational efficiency.`,
      source: "Financial Times",
      author: "Sarah Mitchell",
      publishedAt: "2025-01-22T10:30:00Z",
      category: "earnings",
      sentiment: "positive",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      readTime: "3 min read",
      tags: ["Earnings", "Revenue", "Growth"]
    },
    {
      id: 2,
      title: "Analyst Upgrades Price Target Following Strategic Partnership",
      summary: `Goldman Sachs raises price target to $210 following announcement of major partnership \nthat is expected to drive significant revenue synergies over the next 24 months.`,
      source: "Bloomberg",
      author: "Michael Chen",
      publishedAt: "2025-01-21T14:15:00Z",
      category: "analyst",
      sentiment: "positive",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop",
      readTime: "2 min read",
      tags: ["Analyst", "Price Target", "Partnership"]
    },
    {
      id: 3,
      title: "Market Volatility Creates Buying Opportunity",
      summary: `Recent market correction has created attractive entry points for quality stocks. \nInstitutional investors are increasing positions in fundamentally strong companies.`,
      source: "Wall Street Journal",
      author: "Emily Rodriguez",
      publishedAt: "2025-01-20T09:45:00Z",
      category: "market",
      sentiment: "neutral",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop",
      readTime: "4 min read",
      tags: ["Market", "Volatility", "Opportunity"]
    },
    {
      id: 4,
      title: "New Product Launch Expected to Drive Next Quarter Growth",
      summary: `Company announces innovative product line that addresses emerging market needs. \nEarly customer feedback has been overwhelmingly positive with strong pre-order numbers.`,
      source: "Reuters",
      author: "David Kim",
      publishedAt: "2025-01-19T16:20:00Z",
      category: "earnings",
      sentiment: "positive",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      readTime: "3 min read",
      tags: ["Product Launch", "Growth", "Innovation"]
    },
    {
      id: 5,
      title: "Regulatory Changes May Impact Industry Dynamics",
      summary: `New regulatory framework could reshape competitive landscape. \nCompany's strong compliance record positions it well for upcoming changes.`,
      source: "MarketWatch",
      author: "Lisa Thompson",
      publishedAt: "2025-01-18T11:30:00Z",
      category: "market",
      sentiment: "neutral",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      readTime: "5 min read",
      tags: ["Regulation", "Industry", "Compliance"]
    },
    {
      id: 6,
      title: "Dividend Increase Signals Management Confidence",
      summary: `Board approves 8% dividend increase, marking the 15th consecutive year of growth. \nStrong cash flow generation supports sustainable dividend policy.`,
      source: "Seeking Alpha",
      author: "Robert Johnson",
      publishedAt: "2025-01-17T13:45:00Z",
      category: "earnings",
      sentiment: "positive",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      readTime: "2 min read",
      tags: ["Dividend", "Cash Flow", "Management"]
    }
  ];

  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">News & Insights</h2>
          <p className="text-sm text-muted-foreground">
            Latest news and analysis for {selectedStock?.symbol}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Bell">
            Alerts
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
              activeFilter === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div key={item.id} className="bg-muted/20 rounded-lg p-4 border border-border/50 hover:bg-muted/30 transition-colors duration-200">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              {/* Image */}
              <div className="lg:w-32 lg:h-20 w-full h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-4">
                    <Icon 
                      name={getSentimentIcon(item.sentiment)} 
                      size={16} 
                      className={getSentimentColor(item.sentiment)} 
                    />
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Meta Information */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{item.source}</span>
                    <span>by {item.author}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={12} />
                    <span>{formatTimeAgo(item.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="ExternalLink">
                  Read Full Article
                </Button>
                <Button variant="ghost" size="sm" iconName="Share">
                  Share
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Bookmark">
                  Save
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        <Button variant="outline" iconName="ChevronDown">
          Load More Articles
        </Button>
      </div>
    </div>
  );
};

export default NewsAndInsights;