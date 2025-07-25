import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioSummaryCards from './components/PortfolioSummaryCards';
import PortfolioCompositionChart from './components/PortfolioCompositionChart';
import RecentActivityFeed from './components/RecentActivityFeed';
import HoldingsTable from './components/HoldingsTable';
import QuickActionsPanel from './components/QuickActionsPanel';
import MarketNewsWidget from './components/MarketNewsWidget';

const PortfolioDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your investment performance and access key analytical insights
            </p>
          </div>
          
          {/* Portfolio Summary Cards */}
          <PortfolioSummaryCards />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Charts and Activity */}
            <div className="xl:col-span-2 space-y-8">
              {/* Portfolio Composition and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PortfolioCompositionChart />
                <RecentActivityFeed />
              </div>
              
              {/* Holdings Table */}
              <HoldingsTable />
            </div>
            
            {/* Right Sidebar */}
            <div className="xl:col-span-1 space-y-8">
              <QuickActionsPanel />
              <MarketNewsWidget />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioDashboard;