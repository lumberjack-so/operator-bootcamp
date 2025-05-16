
import React from 'react';
import { Linkedin, Youtube, Mail, Sparkles } from 'lucide-react';
const Footer = () => {
  const year = new Date().getFullYear();
  return <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-xl font-bold text-white flex items-center gap-3 mb-4">
              <span className="text-highlight text-3xl">≡≡</span>
              <span>AI-First Operator Bootacmp</span>
              <Sparkles className="text-highlight h-5 w-5" />
            </div>
            <div className="flex items-center mb-6">
              <span className="text-xs text-gray-400">by</span>
              <a href="https://lumberjack.so" target="_blank" rel="noopener noreferrer" className="flex items-center ml-2">
                <img src="https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_webp,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3fd24c57-2b52-4fa5-8b0c-4d2a85ee0753_720x720.png" alt="Lumberjack" className="h-6 w-6 rounded-sm" />
                <span className="ml-1 text-sm font-medium text-white">Lumberjack</span>
              </a>
            </div>
            <p className="leading-relaxed">
              Turning ordinary operators into automation superstars through hands-on training and community support. 🚀
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Program Links</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="hover:text-white transition-colors flex items-center"><span className="mr-2">🔍</span> Features</a></li>
              <li><a href="#program" className="hover:text-white transition-colors flex items-center"><span className="mr-2">📋</span> Program Structure</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors flex items-center"><span className="mr-2">💰</span> Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors flex items-center"><span className="mr-2">❓</span> FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 text-lg">Connect With Us</h4>
            <ul className="space-y-3">
              <li><a href="https://www.linkedin.com/in/ssdavidai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Linkedin className="h-5 w-5 mr-2" /> LinkedIn</a></li>
              <li><a href="https://www.youtube.com/@lumberjackai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center"><Youtube className="h-5 w-5 mr-2" /> YouTube</a></li>
              <li><a href="mailto:david@szabostuban.com" className="hover:text-white transition-colors flex items-center"><Mail className="h-5 w-5 mr-2" /> Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-400 flex justify-center items-center">
          <p>© {year} AI-First Bootcamp. All rights reserved. Made with 💜 by <a href="https://lumberjack.so" target="_blank" rel="noopener noreferrer" className="text-highlight hover:underline">Lumberjack</a></p>
        </div>
      </div>
    </footer>;
};
export default Footer;
