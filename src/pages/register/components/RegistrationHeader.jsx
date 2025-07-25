import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <header className="w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/portfolio-dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">StockOptimizer Pro</span>
          </Link>

          {/* Login Link */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">Already have an account?</span>
            <Link
              to="/login"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;