
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-5 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold flex items-center gap-3">
            <span className="text-highlight text-3xl">≡≡</span>
            <span>AI-First</span>
            <Sparkles className="text-highlight h-5 w-5" />
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-10 items-center">
          <a href="#features" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">Features</a>
          <a href="#program" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">Program</a>
          <a href="#pricing" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">Pricing</a>
          <a href="#faq" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">FAQ</a>
        </nav>
        
        <div>
          <Button className="button-primary flex items-center gap-2 px-5">
            Try Demo <ExternalLink size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
