import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskToleranceSlider = ({ value, onChange, investmentTimeline, onTimelineChange }) => {
  const getRiskLabel = (value) => {
    if (value <= 3) return 'Conservative';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'Aggressive';
    return 'Very Aggressive';
  };

  const getRiskColor = (value) => {
    if (value <= 3) return 'text-success';
    if (value <= 6) return 'text-warning';
    if (value <= 8) return 'text-error';
    return 'text-error';
  };

  const timelineOptions = [
    { value: 'short', label: '< 1 Year', icon: 'Clock' },
    { value: 'medium', label: '1-5 Years', icon: 'Calendar' },
    { value: 'long', label: '5+ Years', icon: 'TrendingUp' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Investment Preferences</h3>
      
      {/* Risk Tolerance Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-foreground">Risk Tolerance</label>
          <span className={`text-sm font-medium ${getRiskColor(value)}`}>
            {getRiskLabel(value)} ({value}/10)
          </span>
        </div>
        
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #059669 0%, #059669 ${(value-1)*11.11}%, #E2E8F0 ${(value-1)*11.11}%, #E2E8F0 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Low Risk</span>
            <span>High Risk</span>
          </div>
        </div>
      </div>

      {/* Investment Timeline */}
      <div>
        <label className="text-sm font-medium text-foreground mb-4 block">Investment Timeline</label>
        <div className="grid grid-cols-3 gap-2">
          {timelineOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimelineChange(option.value)}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                investmentTimeline === option.value
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon name={option.icon} size={16} />
                <span className="text-xs font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskToleranceSlider;