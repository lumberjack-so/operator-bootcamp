
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-4 border-b border-gray-100 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold flex items-center gap-2">
            <span className="text-highlight text-3xl">≡≡</span>
            <span>AI-First</span>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-gray-700 hover:text-saas-accent transition-colors">Features</a>
          <a href="#program" className="text-gray-700 hover:text-saas-accent transition-colors">Program</a>
          <a href="#pricing" className="text-gray-700 hover:text-saas-accent transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-700 hover:text-saas-accent transition-colors">FAQ</a>
        </nav>
        
        <div>
          <Button className="button-primary flex items-center gap-1">
            Try Demo <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
