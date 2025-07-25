import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StockSelector from './components/StockSelector';
import StockChart from './components/StockChart';
import FinancialMetrics from './components/FinancialMetrics';
import AnalystRecommendations from './components/AnalystRecommendations';
import NewsAndInsights from './components/NewsAndInsights';
import DataTables from './components/DataTables';

const StockAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState({
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 188.75,
    currentPrice: 188.75,
    change: 2.45,
    changePercent: 1.32
  });

  const handleStockSelect = (stock) => {
    setSelectedStock({
      ...stock,
      currentPrice: stock.price
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Stock Selector */}
          <StockSelector 
            selectedStock={selectedStock}
            onStockSelect={handleStockSelect}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Chart */}
            <div className="xl:col-span-2">
              <StockChart 
                selectedStock={selectedStock}
                stockData={[]}
              />
            </div>

            {/* Right Column - Analyst Recommendations */}
            <div className="xl:col-span-1">
              <AnalystRecommendations selectedStock={selectedStock} />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Financial Metrics */}
            <div className="xl:col-span-2">
              <FinancialMetrics selectedStock={selectedStock} />
            </div>

            {/* News and Insights */}
            <div className="xl:col-span-1">
              <NewsAndInsights selectedStock={selectedStock} />
            </div>
          </div>

          {/* Data Tables - Full Width */}
          <div className="mb-8">
            <DataTables selectedStock={selectedStock} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockAnalysis;