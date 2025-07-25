import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const RecommendationFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  recommendationCount 
}) => {
  const recommendationTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'growth', label: 'Growth' },
    { value: 'income', label: 'Income' },
    { value: 'balanced', label: 'Balanced' }
  ];

  const sectorOptions = [
    { value: 'all', label: 'All Sectors' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'energy', label: 'Energy' },
    { value: 'consumer', label: 'Consumer Goods' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'utilities', label: 'Utilities' }
  ];

  const investmentAmountOptions = [
    { value: 'all', label: 'Any Amount' },
    { value: 'under-1k', label: 'Under $1,000' },
    { value: '1k-5k', label: '$1,000 - $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: 'over-10k', label: 'Over $10,000' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filter Recommendations</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            {recommendationCount} recommendations found
          </span>
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Recommendation Type"
          options={recommendationTypeOptions}
          value={filters.type}
          onChange={(value) => onFilterChange('type', value)}
          className="mb-0"
        />

        <Select
          label="Sector Preference"
          options={sectorOptions}
          value={filters.sector}
          onChange={(value) => onFilterChange('sector', value)}
          className="mb-0"
        />

        <Select
          label="Investment Amount"
          options={investmentAmountOptions}
          value={filters.amount}
          onChange={(value) => onFilterChange('amount', value)}
          className="mb-0"
        />
      </div>

      {/* Active Filters */}
      {(filters.type !== 'all' || filters.sector !== 'all' || filters.amount !== 'all') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.type !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                {recommendationTypeOptions.find(opt => opt.value === filters.type)?.label}
                <button
                  onClick={() => onFilterChange('type', 'all')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.sector !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                {sectorOptions.find(opt => opt.value === filters.sector)?.label}
                <button
                  onClick={() => onFilterChange('sector', 'all')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {filters.amount !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                {investmentAmountOptions.find(opt => opt.value === filters.amount)?.label}
                <button
                  onClick={() => onFilterChange('amount', 'all')}
                  className="ml-1 hover:text-primary/80"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationFilters;