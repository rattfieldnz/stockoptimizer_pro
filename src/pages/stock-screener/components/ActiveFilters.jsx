import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll, resultCount }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters.peRatio) {
      active.push({ key: 'peRatio', label: `P/E: ${filters.peRatio}`, value: filters.peRatio });
    }
    if (filters.dividendYield) {
      active.push({ key: 'dividendYield', label: `Dividend: ${filters.dividendYield}%+`, value: filters.dividendYield });
    }
    if (filters.marketCap) {
      active.push({ key: 'marketCap', label: `Market Cap: ${filters.marketCap}`, value: filters.marketCap });
    }
    if (filters.minPrice) {
      active.push({ key: 'minPrice', label: `Min Price: $${filters.minPrice}`, value: filters.minPrice });
    }
    if (filters.maxPrice) {
      active.push({ key: 'maxPrice', label: `Max Price: $${filters.maxPrice}`, value: filters.maxPrice });
    }
    if (filters.rsiMin) {
      active.push({ key: 'rsiMin', label: `RSI Min: ${filters.rsiMin}`, value: filters.rsiMin });
    }
    if (filters.rsiMax) {
      active.push({ key: 'rsiMax', label: `RSI Max: ${filters.rsiMax}`, value: filters.rsiMax });
    }
    if (filters.above50MA) {
      active.push({ key: 'above50MA', label: 'Above 50-day MA', value: true });
    }
    if (filters.above200MA) {
      active.push({ key: 'above200MA', label: 'Above 200-day MA', value: true });
    }
    if (filters.sectors && filters.sectors.length > 0) {
      filters.sectors.forEach(sector => {
        active.push({ key: 'sectors', label: `Sector: ${sector}`, value: sector });
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filterKey, filterValue) => {
    if (filterKey === 'sectors') {
      const updatedSectors = filters.sectors.filter(sector => sector !== filterValue);
      onRemoveFilter('sectors', updatedSectors);
    } else {
      onRemoveFilter(filterKey, '');
    }
  };

  return (
    <div className="bg-muted/50 border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Active Filters ({activeFilters.length})
          </span>
          <span className="text-sm text-muted-foreground">
            • {resultCount} results found
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.key}-${filter.value}-${index}`}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter.key, filter.value)}
              className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;