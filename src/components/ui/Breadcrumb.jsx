import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const pathMap = {
    '/portfolio-dashboard': 'Dashboard',
    '/stock-analysis': 'Stock Analysis',
    '/portfolio-recommendations': 'Portfolio Recommendations',
    '/stock-screener': 'Stock Screener',
    '/settings': 'Settings',
    '/help': 'Help'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    breadcrumbs.push({
      name: 'Dashboard',
      path: '/portfolio-dashboard',
      isActive: false
    });

    // Add current page if it's not dashboard
    if (location.pathname !== '/portfolio-dashboard') {
      const currentPageName = pathMap[location.pathname] || 'Page';
      breadcrumbs.push({
        name: currentPageName,
        path: location.pathname,
        isActive: true
      });
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1 && breadcrumbs[0].isActive) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          )}
          {breadcrumb.isActive ? (
            <span className="text-foreground font-medium">{breadcrumb.name}</span>
          ) : (
            <Link
              to={breadcrumb.path}
              className="hover:text-foreground transition-colors duration-200"
            >
              {breadcrumb.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;