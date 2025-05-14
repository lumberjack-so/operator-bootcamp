
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const Header = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white py-5 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold flex items-center gap-3">
            <span className="text-highlight text-3xl">≡≡</span>
            <span>Operator Bootcamp</span>
            <Sparkles className="text-highlight h-5 w-5" />
          </div>
          <div className="flex items-center">
            <span className="text-xs text-gray-500">by</span>
            <a href="https://lumberjack.so" target="_blank" rel="noopener noreferrer" className="flex items-center ml-2">
              <img 
                src="https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3fd24c57-2b52-4fa5-8b0c-4d2a85ee0753_720x720.png" 
                alt="Lumberjack" 
                className="h-6 w-6 rounded-sm"
              />
              <span className="ml-1 text-sm font-medium">Lumberjack</span>
            </a>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-10 items-center">
          <a href="#features" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">Features</a>
          <a href="#program" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">Program</a>
          <a href="#pricing" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">Pricing</a>
          <a href="#faq" className="text-gray-700 hover:text-saas-accent transition-colors font-medium">FAQ</a>
        </nav>
        
        <div>
          <Button 
            onClick={scrollToPricing}
            className="button-primary flex items-center gap-2 px-5"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
