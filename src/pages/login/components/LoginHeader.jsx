import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <header className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Link to="/login" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={24} color="white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-foreground">
                StockOptimizer Pro
              </h1>
              <p className="text-sm text-muted-foreground">
                Smart Portfolio Management
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LoginHeader;