import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, onSaveScreen }) => {
  const [expandedSections, setExpandedSections] = useState({
    fundamental: true,
    technical: false,
    sector: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const fundamentalOptions = [
    { value: 'low', label: 'Low (< 15)' },
    { value: 'medium', label: 'Medium (15-25)' },
    { value: 'high', label: 'High (> 25)' }
  ];

  const marketCapOptions = [
    { value: 'small', label: 'Small Cap (< $2B)' },
    { value: 'mid', label: 'Mid Cap ($2B-$10B)' },
    { value: 'large', label: 'Large Cap (> $10B)' }
  ];

  const sectorOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'energy', label: 'Energy' },
    { value: 'consumer', label: 'Consumer Goods' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'materials', label: 'Materials' }
  ];

  const getActiveFilterCount = (section) => {
    switch (section) {
      case 'fundamental':
        return [filters.peRatio, filters.dividendYield, filters.marketCap].filter(Boolean).length;
      case 'technical':
        return [filters.rsi, filters.movingAverage].filter(Boolean).length;
      case 'sector':
        return filters.sectors?.length || 0;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full h-full bg-card border-r border-border overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        </div>

        {/* Fundamental Metrics */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('fundamental')}
            className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Calculator" size={18} />
              <span className="font-medium text-foreground">Fundamental Metrics</span>
              {getActiveFilterCount('fundamental') > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount('fundamental')}
                </span>
              )}
            </div>
            <Icon 
              name={expandedSections.fundamental ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>

          {expandedSections.fundamental && (
            <div className="mt-4 space-y-4 pl-4">
              <Select
                label="P/E Ratio"
                placeholder="Select P/E range"
                options={fundamentalOptions}
                value={filters.peRatio}
                onChange={(value) => onFilterChange('peRatio', value)}
              />

              <Input
                label="Dividend Yield (%)"
                type="number"
                placeholder="Min dividend yield"
                value={filters.dividendYield}
                onChange={(e) => onFilterChange('dividendYield', e.target.value)}
                min="0"
                max="20"
                step="0.1"
              />

              <Select
                label="Market Cap"
                placeholder="Select market cap"
                options={marketCapOptions}
                value={filters.marketCap}
                onChange={(value) => onFilterChange('marketCap', value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Min Price ($)"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                  min="0"
                  step="0.01"
                />
                <Input
                  label="Max Price ($)"
                  type="number"
                  placeholder="1000"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          )}
        </div>

        {/* Technical Indicators */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('technical')}
            className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={18} />
              <span className="font-medium text-foreground">Technical Indicators</span>
              {getActiveFilterCount('technical') > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount('technical')}
                </span>
              )}
            </div>
            <Icon 
              name={expandedSections.technical ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>

          {expandedSections.technical && (
            <div className="mt-4 space-y-4 pl-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="RSI Min"
                  type="number"
                  placeholder="30"
                  value={filters.rsiMin}
                  onChange={(e) => onFilterChange('rsiMin', e.target.value)}
                  min="0"
                  max="100"
                />
                <Input
                  label="RSI Max"
                  type="number"
                  placeholder="70"
                  value={filters.rsiMax}
                  onChange={(e) => onFilterChange('rsiMax', e.target.value)}
                  min="0"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Moving Average</label>
                <div className="space-y-2">
                  <Checkbox
                    label="Above 50-day MA"
                    checked={filters.above50MA}
                    onChange={(e) => onFilterChange('above50MA', e.target.checked)}
                  />
                  <Checkbox
                    label="Above 200-day MA"
                    checked={filters.above200MA}
                    onChange={(e) => onFilterChange('above200MA', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sector & Industry */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('sector')}
            className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={18} />
              <span className="font-medium text-foreground">Sector & Industry</span>
              {getActiveFilterCount('sector') > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount('sector')}
                </span>
              )}
            </div>
            <Icon 
              name={expandedSections.sector ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>

          {expandedSections.sector && (
            <div className="mt-4 pl-4">
              <Select
                label="Sectors"
                placeholder="Select sectors"
                options={sectorOptions}
                value={filters.sectors}
                onChange={(value) => onFilterChange('sectors', value)}
                multiple
                searchable
              />
            </div>
          )}
        </div>

        {/* Save Screen */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={onSaveScreen}
            iconName="Save"
            iconPosition="left"
          >
            Save Screen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;