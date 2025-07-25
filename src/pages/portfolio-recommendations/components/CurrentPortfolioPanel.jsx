import React from 'react';


const CurrentPortfolioPanel = ({ currentPortfolio, totalValue, performanceMetrics }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Current Portfolio</h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Value</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className={`text-lg font-semibold ${performanceMetrics.totalReturn >= 0 ? 'text-success' : 'text-error'}`}>
            {performanceMetrics.totalReturn >= 0 ? '+' : ''}{performanceMetrics.totalReturn}%
          </div>
          <div className="text-xs text-muted-foreground">Total Return</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{performanceMetrics.dividendYield}%</div>
          <div className="text-xs text-muted-foreground">Dividend Yield</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{performanceMetrics.riskScore}/10</div>
          <div className="text-xs text-muted-foreground">Risk Score</div>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Holdings</h3>
        {currentPortfolio.map((holding) => (
          <div key={holding.symbol} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">{holding.symbol.substring(0, 2)}</span>
              </div>
              <div>
                <div className="font-medium text-foreground">{holding.symbol}</div>
                <div className="text-sm text-muted-foreground">{holding.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-foreground">{holding.allocation}%</div>
              <div className="text-sm text-muted-foreground">${holding.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPortfolioPanel;