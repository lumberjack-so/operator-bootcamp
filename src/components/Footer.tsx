
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <span className="text-highlight text-3xl">≡≡</span>
              <span>AI-First</span>
            </div>
            <p>
              Turning ordinary operators into automation superstars through hands-on training and community support.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Program Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#program" className="hover:text-white transition-colors">Program Structure</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-400">
          <p>© {year} AI-First Bootcamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
