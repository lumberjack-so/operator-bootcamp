import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MailOpen, PartyPopper, Server, AlertCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { 
  trackAffonsoPurchase, 
  getPurchaseData, 
  clearPurchaseData, 
  isAffonsoScriptLoaded
} from '@/utils/trackingUtils';
import { toast } from '@/components/ui/sonner';

type TrackingStatus = 'idle' | 'loading' | 'success' | 'error' | 'timeout';

const ThankYou = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [vimeoLoaded, setVimeoLoaded] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<TrackingStatus>('idle');
  const [scriptReady, setScriptReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
    
    // Load Vimeo player script
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    script.onload = () => setVimeoLoaded(true);
    document.body.appendChild(script);
    
    // Check if Affonso script is loaded
    const checkScriptLoaded = () => {
      if (isAffonsoScriptLoaded()) {
        setScriptReady(true);
        return;
      }
      
      // Check again in 1 second if not loaded
      setTimeout(checkScriptLoaded, 1000);
    };
    
    // Start checking for script
    checkScriptLoaded();

    // Trigger Plausible Purchase Completed event with revenue tracking
    const purchaseData = getPurchaseData();
    if (purchaseData && window.plausible) {
      window.plausible('Purchase Completed', {
        props: {
          plan: purchaseData.productName || 'Unknown'
        },
        revenue: {
          currency: 'USD',
          amount: purchaseData.amount
        }
      });
    }
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
      // Only remove the script if we added it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initial attempt to track purchase when component loads
  useEffect(() => {
    // Only run this once when the component mounts or when retry count changes
    const attemptPurchaseTracking = async () => {
      // Only proceed if we're in idle state and script is ready
      if (trackingStatus !== 'idle' || !scriptReady) return;
      
      const purchaseData = getPurchaseData();
      
      if (purchaseData && purchaseData.email) {
        setTrackingStatus('loading');
        
        try {
          const result = await trackAffonsoPurchase(
            purchaseData.purchaseId,
            purchaseData.amount,
            purchaseData.email
          );
          
          if (result.success) {
            setTrackingStatus('success');
            toast.success("Purchase successfully tracked!", { 
              description: "Thank you for your purchase!" 
            });
            clearPurchaseData(); // Clear after successful tracking
          } else {
            setTrackingStatus('error');
            // Silent error - don't show to user
            console.error("Tracking error:", result.error);
          }
        } catch (error) {
          console.error("Error tracking purchase:", error);
          setTrackingStatus('error');
          // Silent error - don't show to user
        }
      }
    };
    
    attemptPurchaseTracking();
  }, [scriptReady, retryCount]); // Dependency on retryCount allows retrying

  // Set up tracking timeout in a separate useEffect
  useEffect(() => {
    if (trackingStatus !== 'loading') return;
    
    const trackingTimeout = setTimeout(() => {
      setTrackingStatus('timeout');
      // Silent timeout - don't show to user
      console.error("Purchase tracking timed out.");
    }, 15000);
    
    return () => clearTimeout(trackingTimeout);
  }, [trackingStatus]);

  // Purchase data for display
  const purchaseData = getPurchaseData();

  return (
    <div className="min-h-screen flex flex-col">
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
              
              <div className="mb-12 max-w-2xl mx-auto">
                <div className="relative" style={{ paddingTop: "75%" }}>
                  <iframe 
                    src="https://player.vimeo.com/video/1085020029?h=e471f28267&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} 
                    title="You're in! Welcome to the AI-First Operator Bootcamp!"
                  />
                </div>
              </div>
              
              {/* Purchase Tracking Status - Only show on success */}
              {purchaseData && trackingStatus === 'success' && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Purchase Details</h3>
                  
                  {purchaseData.productName && (
                    <div className="mb-2 text-left">
                      <span className="font-medium">Product:</span> {purchaseData.productName}
                    </div>
                  )}
                  
                  <div className="mb-4 text-left">
                    <span className="font-medium">Amount:</span> ${purchaseData.amount}
                  </div>
                  
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <Check className="h-5 w-5" />
                    Purchase tracked successfully!
                  </div>
                </div>
              )}
              
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
    </div>
  );
};

export default ThankYou;
