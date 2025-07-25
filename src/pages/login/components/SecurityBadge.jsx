import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadge = () => {
  return (
    <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-border">
      {/* SSL Certificate */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
          <Icon name="Shield" size={12} className="text-green-600" />
        </div>
        <span>SSL Secured</span>
      </div>

      {/* Privacy Policy */}
      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
        Privacy Policy
      </button>

      {/* Terms of Service */}
      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
        Terms of Service
      </button>
    </div>
  );
};

export default SecurityBadge;