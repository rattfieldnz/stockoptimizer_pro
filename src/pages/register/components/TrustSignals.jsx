import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects your data'
    },
    {
      icon: 'Lock',
      title: 'Data Privacy',
      description: 'Your information is never shared with third parties'
    },
    {
      icon: 'CheckCircle',
      title: 'SEC Compliant',
      description: 'Fully compliant with financial regulations'
    }
  ];

  const securityBadges = [
    {
      name: 'SSL Secured',
      icon: 'Shield',
      color: 'text-green-600'
    },
    {
      name: 'FINRA Member',
      icon: 'Award',
      color: 'text-blue-600'
    },
    {
      name: 'SIPC Protected',
      icon: 'CheckCircle',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Security is Our Priority</h3>
        <div className="space-y-3">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Badges */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-center space-x-6">
          {securityBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              <Icon name={badge.icon} size={20} className={badge.color} />
              <span className="text-xs text-muted-foreground text-center">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Notice */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              StockOptimizer Pro is a registered investment advisor. Securities offered through FINRA member firms. 
              All investments involve risk and may lose value. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;