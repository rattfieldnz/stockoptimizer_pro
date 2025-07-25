import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CurrentPortfolioPanel from './components/CurrentPortfolioPanel';
import OptimizedPortfolioPanel from './components/OptimizedPortfolioPanel';
import RecommendationCard from './components/RecommendationCard';
import RiskToleranceSlider from './components/RiskToleranceSlider';
import RecommendationFilters from './components/RecommendationFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PortfolioRecommendations = () => {
  const [riskTolerance, setRiskTolerance] = useState(5);
  const [investmentTimeline, setInvestmentTimeline] = useState('medium');
  const [filters, setFilters] = useState({
    type: 'all',
    sector: 'all',
    amount: 'all'
  });
  const [selectedRecommendations, setSelectedRecommendations] = useState([]);

  // Mock current portfolio data
  const currentPortfolio = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      allocation: 25,
      value: 125000
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      allocation: 20,
      value: 100000
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      allocation: 15,
      value: 75000
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      allocation: 12,
      value: 60000
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      allocation: 10,
      value: 50000
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      allocation: 8,
      value: 40000
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      allocation: 6,
      value: 30000
    },
    {
      symbol: "NFLX",
      name: "Netflix Inc.",
      allocation: 4,
      value: 20000
    }
  ];

  const totalValue = 500000;
  const performanceMetrics = {
    totalReturn: 12.5,
    dividendYield: 1.8,
    riskScore: 7
  };

  // Mock optimized portfolio data
  const optimizedPortfolio = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      allocation: 20,
      projectedGain: 8500
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      allocation: 18,
      projectedGain: 12000
    },
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market ETF",
      allocation: 15,
      projectedGain: 15000
    },
    {
      symbol: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      allocation: 12,
      projectedGain: 9500
    },
    {
      symbol: "QQQ",
      name: "Invesco QQQ Trust",
      allocation: 10,
      projectedGain: 7800
    },
    {
      symbol: "BRK.B",
      name: "Berkshire Hathaway Inc.",
      allocation: 8,
      projectedGain: 6200
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      allocation: 7,
      projectedGain: 4500
    },
    {
      symbol: "PG",
      name: "Procter & Gamble Co.",
      allocation: 5,
      projectedGain: 3800
    },
    {
      symbol: "KO",
      name: "The Coca-Cola Company",
      allocation: 3,
      projectedGain: 2100
    },
    {
      symbol: "PEP",
      name: "PepsiCo Inc.",
      allocation: 2,
      projectedGain: 1500
    }
  ];

  const projectedValue = 570000;
  const projectedMetrics = {
    returnImprovement: 3.2,
    dividendImprovement: 1.4,
    riskReduction: 1.5
  };

  // Mock recommendations data
  const allRecommendations = [
    {
      id: 1,
      symbol: "VTI",
      name: "Vanguard Total Stock Market ETF",
      action: "buy",
      quantity: 50,
      amount: 12500,
      risk: "Low",
      expectedReturn: 8.5,
      analystRating: 4.5,
      rationale: "Diversify your portfolio with broad market exposure while reducing concentration risk in individual tech stocks.",
      portfolioImpact: "This addition will reduce your portfolio's volatility by 15% while maintaining growth potential through market-wide exposure.",
      type: "balanced",
      sector: "diversified"
    },
    {
      id: 2,
      symbol: "SCHD",
      name: "Schwab US Dividend Equity ETF",
      action: "buy",
      quantity: 75,
      amount: 6000,
      risk: "Low",
      expectedReturn: 6.2,
      analystRating: 4.8,
      rationale: "Increase dividend income and add stability to your growth-heavy portfolio with quality dividend-paying stocks.",
      portfolioImpact: "Expected to boost your annual dividend yield from 1.8% to 2.9% while providing defensive characteristics.",
      type: "income",
      sector: "diversified"
    },
    {
      id: 3,
      symbol: "TSLA",
      name: "Tesla Inc.",
      action: "sell",
      quantity: 25,
      amount: 6250,
      risk: "High",
      expectedReturn: -2.1,
      analystRating: 3.2,
      rationale: "Reduce overexposure to volatile growth stocks and reallocate to more stable investments for better risk-adjusted returns.",
      portfolioImpact: "Selling 50% of TSLA position will reduce portfolio volatility by 8% and free up capital for diversification.",
      type: "growth",
      sector: "technology"
    },
    {
      id: 4,
      symbol: "BRK.B",
      name: "Berkshire Hathaway Inc.",
      action: "buy",
      quantity: 30,
      amount: 10500,
      risk: "Medium",
      expectedReturn: 7.8,
      analystRating: 4.3,
      rationale: "Add value investing exposure and benefit from Warren Buffett\'s proven investment strategy and cash reserves.",
      portfolioImpact: "Provides defensive characteristics and value exposure to complement your growth-oriented holdings.",
      type: "balanced",
      sector: "finance"
    },
    {
      id: 5,
      symbol: "JNJ",
      name: "Johnson & Johnson",
      action: "buy",
      quantity: 40,
      amount: 7200,
      risk: "Low",
      expectedReturn: 5.5,
      analystRating: 4.1,
      rationale: "Add healthcare sector exposure and dividend aristocrat status for consistent income and defensive positioning.",
      portfolioImpact: "Healthcare allocation will provide portfolio stability during market downturns and consistent dividend growth.",
      type: "income",
      sector: "healthcare"
    },
    {
      id: 6,
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      action: "rebalance",
      quantity: -10,
      amount: -3500,
      risk: "Medium",
      expectedReturn: 4.2,
      analystRating: 4.0,
      rationale: "Reduce concentration in mega-cap tech while maintaining exposure to Google's strong fundamentals and AI leadership.",
      portfolioImpact: "Trimming position size will improve diversification while keeping exposure to secular growth trends.",
      type: "growth",
      sector: "technology"
    }
  ];

  // Filter recommendations based on current filters
  const getFilteredRecommendations = () => {
    return allRecommendations.filter(rec => {
      if (filters.type !== 'all' && rec.type !== filters.type) return false;
      if (filters.sector !== 'all' && rec.sector !== filters.sector) return false;
      if (filters.amount !== 'all') {
        const amount = Math.abs(rec.amount);
        switch (filters.amount) {
          case 'under-1k': return amount < 1000;
          case '1k-5k': return amount >= 1000 && amount <= 5000;
          case '5k-10k': return amount >= 5000 && amount <= 10000;
          case 'over-10k': return amount > 10000;
          default: return true;
        }
      }
      return true;
    });
  };

  const filteredRecommendations = getFilteredRecommendations();

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      sector: 'all',
      amount: 'all'
    });
  };

  const handleAcceptRecommendation = (recommendation) => {
    setSelectedRecommendations(prev => [...prev, recommendation.id]);
    // Here you would typically make an API call to execute the recommendation
    console.log('Accepting recommendation:', recommendation);
  };

  const handleModifyRecommendation = (recommendation) => {
    // Here you would open a modal or navigate to a modification screen
    console.log('Modifying recommendation:', recommendation);
  };

  const handleLearnMore = (recommendation) => {
    // Here you would open detailed analysis or navigate to stock details
    console.log('Learning more about:', recommendation);
  };

  const handleAcceptAllRecommendations = () => {
    // Here you would implement logic to accept all optimized portfolio recommendations
    console.log('Accepting all recommendations');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Portfolio Recommendations</h1>
                <p className="text-muted-foreground mt-2">
                  Personalized investment suggestions based on your portfolio analysis and optimization opportunities
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
                <Button variant="default" iconName="RefreshCw" iconPosition="left">
                  Refresh Analysis
                </Button>
              </div>
            </div>
          </div>

          {/* Portfolio Comparison Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CurrentPortfolioPanel 
              currentPortfolio={currentPortfolio}
              totalValue={totalValue}
              performanceMetrics={performanceMetrics}
            />
            <OptimizedPortfolioPanel 
              optimizedPortfolio={optimizedPortfolio}
              projectedValue={projectedValue}
              projectedMetrics={projectedMetrics}
              onAcceptAll={handleAcceptAllRecommendations}
            />
          </div>

          {/* Controls Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RiskToleranceSlider 
              value={riskTolerance}
              onChange={setRiskTolerance}
              investmentTimeline={investmentTimeline}
              onTimelineChange={setInvestmentTimeline}
            />
            <RecommendationFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              recommendationCount={filteredRecommendations.length}
            />
          </div>

          {/* Recommendations Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">Individual Recommendations</h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {selectedRecommendations.length} of {filteredRecommendations.length} selected
                </span>
                {selectedRecommendations.length > 0 && (
                  <Button variant="outline" size="sm" iconName="Check" iconPosition="left">
                    Execute Selected ({selectedRecommendations.length})
                  </Button>
                )}
              </div>
            </div>

            {filteredRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    onAccept={handleAcceptRecommendation}
                    onModify={handleModifyRecommendation}
                    onLearnMore={handleLearnMore}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No recommendations found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or risk tolerance to see more recommendations.
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Summary Statistics */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recommendation Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {allRecommendations.filter(r => r.action === 'buy').length}
                </div>
                <div className="text-sm text-muted-foreground">Buy Recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-error">
                  {allRecommendations.filter(r => r.action === 'sell').length}
                </div>
                <div className="text-sm text-muted-foreground">Sell Recommendations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {allRecommendations.filter(r => r.action === 'rebalance').length}
                </div>
                <div className="text-sm text-muted-foreground">Rebalance Suggestions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  +{projectedMetrics.returnImprovement}%
                </div>
                <div className="text-sm text-muted-foreground">Projected Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioRecommendations;