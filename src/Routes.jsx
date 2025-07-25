import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Register from "pages/register";
import PortfolioRecommendations from "pages/portfolio-recommendations";
import PortfolioDashboard from "pages/portfolio-dashboard";
import StockScreener from "pages/stock-screener";
import StockAnalysis from "pages/stock-analysis";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<PortfolioDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio-recommendations" element={<PortfolioRecommendations />} />
        <Route path="/portfolio-dashboard" element={<PortfolioDashboard />} />
        <Route path="/stock-screener" element={<StockScreener />} />
        <Route path="/stock-analysis" element={<StockAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;