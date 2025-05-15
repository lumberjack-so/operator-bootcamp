
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MailOpen, PartyPopper, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactConfetti from 'react-confetti';

const ThankYou = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Set dimensions for confetti
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  return <div className="min-h-screen flex flex-col">
      {showConfetti && <ReactConfetti width={dimensions.width} height={dimensions.height} recycle={true} numberOfPieces={200} gravity={0.15} />}
      
      <Header />
      
      <main className="flex-grow">
        <section className="py-20 md:py-28 bg-gradient-to-b from-purple-50 via-white to-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-purple-100 p-5 rounded-full">
                  <PartyPopper className="h-14 w-14 text-highlight animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Thank You for Your Purchase!
              </h1>
              
              <p className="text-xl text-gray-700 mb-12">
                You're now officially part of the AI-First Operator Bootcamp!
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <MailOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold mb-2">Check Your Email</h3>
                      <p className="text-gray-600">
                        You should receive an email shortly with all the details about your access to the bootcamp resources.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-highlight bg-opacity-20 p-3 rounded-full mr-4">
                      <Calendar className="h-6 w-6 text-highlight-dark" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold mb-2">Calendar Invite Coming Soon</h3>
                      <p className="text-gray-600">
                        In the next week, you'll receive a calendar invite for the upcoming sessions. Add it to your calendar so you don't miss out!
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Check className="h-6 w-6 text-saas-accent" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold mb-2">Get Ready</h3>
                      <p className="text-gray-600">We're excited to have you on board! Prepare to transform your life with AI-first operations. </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-3 rounded-full mr-4">
                      <Server className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold mb-2">Setup Your n8n Environment</h3>
                      <p className="text-gray-600">
                        Before the program starts, please ensure you have a working n8n environment. You can either:
                      </p>
                      <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                        <li>Sign up for an <a href="https://www.n8n.io/cloud/" target="_blank" rel="noopener noreferrer" className="text-saas-accent hover:underline">n8n cloud subscription</a></li>
                        <li>Self-host your own n8n instance (for help, follow this <a href="https://lumberjack.so/p/install-n8n-on-railway-in-5-minutes" target="_blank" rel="noopener noreferrer" className="text-saas-accent hover:underline">5-minute Railway setup tutorial</a>)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button asChild className="bg-saas-accent hover:bg-blue-700 text-white py-6 px-8">
                  <Link to="/">
                    Back to Homepage
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

export default ThankYou;
