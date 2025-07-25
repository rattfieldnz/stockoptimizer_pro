import React from 'react';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Registration Form */}
            <div className="order-2 lg:order-1">
              <RegistrationForm />
            </div>

            {/* Trust Signals & Information */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-8">
              <div className="bg-card rounded-xl border border-border p-6 lg:p-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors duration-200">Support</a>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} StockOptimizer Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;