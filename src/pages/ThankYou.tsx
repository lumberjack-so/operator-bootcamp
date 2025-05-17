import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MailOpen, PartyPopper, Server, RefreshCw, AlertTriangle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { useToast } from '@/hooks/use-toast';
import { trackPurchase, checkAffonsoStatus } from '@/utils/trackingUtils';
import '../types/affonso'; // Import the types file

// Define a type for the product information
interface ProductInfo {
  productId: string;
  productName: string;
  productPrice: number;
}

// Define states for tracking script loading
type ScriptStatus = 'loading' | 'ready' | 'timeout' | 'error';

const ThankYou = () => {
  // UI and general state
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [vimeoLoaded, setVimeoLoaded] = useState(false);
  const [checkoutVerified, setCheckoutVerified] = useState(false);
  
  // Tracking and Affonso script state with more detailed status
  const [scriptStatus, setScriptStatus] = useState<ScriptStatus>('loading');
  const [tracked, setTracked] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  
  // Hooks
  const location = useLocation();
  const { toast } = useToast();
  
  // Get checkout info from URL params
  const searchParams = new URLSearchParams(location.search);
  const checkoutId = searchParams.get('checkout_id');
  
  // Check Affonso script status more robustly
  const checkAffonsoScript = useCallback(() => {
    const status = checkAffonsoStatus();
    
    if (status.ready) {
      console.log("✅ Affonso script detected and ready!");
      setScriptStatus('ready');
      return true;
    }
    return false;
  }, []);
  
  // Handle tracking of purchase
  const handleTrackPurchase = useCallback(async () => {
    if (tracked || !checkoutId || !productInfo || scriptStatus !== 'ready') {
      return;
    }
    
    setIsTracking(true);
    
    try {
      const success = await trackPurchase(checkoutId, productInfo);
      
      if (success) {
        console.log('✅ Successfully tracked purchase with Affonso');
        setTracked(true);
        toast({
          title: "Purchase Tracked",
          description: "Your purchase has been successfully recorded. Thank you!",
          variant: "default"
        });
      } else {
        throw new Error("Tracking failed");
      }
    } catch (error) {
      console.error('Error tracking purchase with Affonso:', error);
      toast({
        title: "Tracking Issue",
        description: "There was an issue recording your purchase. We'll try again automatically.",
        variant: "destructive"
      });
    } finally {
      setIsTracking(false);
    }
  }, [checkoutId, productInfo, scriptStatus, toast, tracked]);
  
  // Function to handle manual retry with exponential backoff
  const handleRetryScriptLoading = useCallback(() => {
    console.log(`Manually retrying Affonso script loading (attempt ${retryCount + 1})...`);
    setScriptStatus('loading');
    
    // Calculate backoff delay (2^n * 500ms)
    const backoffDelay = Math.min(Math.pow(2, retryCount) * 500, 5000);
    
    // Clear script status data
    if (window.affonsoStatus) {
      window.affonsoStatus.scriptLoaded = false;
      window.affonsoStatus.scriptFailed = false;
      window.affonsoStatus.loadAttempts += 1;
      window.affonsoStatus.lastAttempt = new Date();
    }
    
    // Try to reload the script with backoff
    setTimeout(() => {
      const existingScript = document.querySelector('script[data-affonso="cmas59i1t0030zn5a024kdnm2"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.src = 'https://affonso.io/js/pixel.min.js';
      script.async = true;
      script.dataset.affonso = 'cmas59i1t0030zn5a024kdnm2';
      script.dataset.cookie_duration = '30';
      
      script.onload = () => {
        if (window.affonsoStatus) {
          window.affonsoStatus.scriptLoaded = true;
          window.affonsoStatus.lastAttempt = new Date();
        }
        setScriptStatus('ready');
        document.dispatchEvent(new Event('affonso_ready'));
      };
      
      script.onerror = () => {
        if (window.affonsoStatus) {
          window.affonsoStatus.scriptFailed = true;
          window.affonsoStatus.lastAttempt = new Date();
        }
        setScriptStatus('error');
      };
      
      document.head.appendChild(script);
      setRetryCount(prev => prev + 1);
    }, backoffDelay);
  }, [retryCount]);
  
  // Extract product info from URL or localStorage
  useEffect(() => {
    if (!checkoutId) return;
    
    const urlProductId = searchParams.get('product_id');
    const urlProductName = searchParams.get('product_name');
    const urlProductPrice = searchParams.get('product_price');
    
    // Get product details from URL or localStorage with fallbacks
    let info: ProductInfo;
    
    if (urlProductId && urlProductName && urlProductPrice) {
      info = {
        productId: urlProductId,
        productName: decodeURIComponent(urlProductName),
        productPrice: parseFloat(urlProductPrice)
      };
      console.log('Product info from URL:', info);
    } else {
      console.log('No product info in URL, checking localStorage...');
      const planInfoStr = localStorage.getItem('selectedPlan');
      
      if (planInfoStr) {
        try {
          const parsedInfo = JSON.parse(planInfoStr);
          console.log('Retrieved product info from localStorage:', parsedInfo);
          
          info = {
            productId: parsedInfo.productId || 'bootcamp-purchase',
            productName: parsedInfo.productName || 'AI-First Operator Bootcamp',
            productPrice: parsedInfo.productPrice || 0
          };
        } catch (error) {
          console.error('Error parsing product info from localStorage:', error);
          info = {
            productId: 'bootcamp-purchase',
            productName: 'AI-First Operator Bootcamp',
            productPrice: 0
          };
        }
      } else {
        console.log('No product info found in localStorage');
        info = {
          productId: 'bootcamp-purchase',
          productName: 'AI-First Operator Bootcamp',
          productPrice: 0
        };
      }
    }
    
    // Store product info in component state for later use
    setProductInfo(info);
    
    // Persist for potential future retries (falls back to localStorage as backup)
    try {
      sessionStorage.setItem('purchaseData', JSON.stringify({
        checkoutId,
        productInfo: info,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.error('Error storing purchase data:', e);
    }
  }, [checkoutId, searchParams]);
  
  // Main effect to detect Affonso script and set up listeners
  useEffect(() => {
    console.log("Checking for Affonso script...");
    
    // Check if we already have window.affonsoStatus from our HTML setup
    if (window.affonsoStatus && window.affonsoStatus.scriptLoaded) {
      console.log("✅ Affonso status object indicates script is loaded!");
      setScriptStatus('ready');
      return;
    }
    
    // Try immediate check for Affonso availability
    if (checkAffonsoScript()) {
      return;
    }
    
    // Set up event listener for our custom event
    const handleAffonsoReady = () => {
      console.log("✅ Affonso ready event received!");
      setScriptStatus('ready');
    };
    document.addEventListener('affonso_ready', handleAffonsoReady);
    
    // Set a longer timeout (15 seconds) for script loading
    const timeoutId = setTimeout(() => {
      if (scriptStatus === 'loading') {
        console.log("❌ Affonso script load timeout after 15 seconds");
        setScriptStatus('timeout');
      }
    }, 15000);
    
    // Set up polling as backup (every 1 second for 15 seconds)
    const intervalId = setInterval(() => {
      if (checkAffonsoScript()) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      }
    }, 1000);
    
    // Clean up
    return () => {
      document.removeEventListener('affonso_ready', handleAffonsoReady);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [checkAffonsoScript, scriptStatus]);
  
  // Effect for automatic tracking when conditions are right
  useEffect(() => {
    if (checkoutId && productInfo && scriptStatus === 'ready' && !tracked && !isTracking) {
      handleTrackPurchase();
    }
  }, [checkoutId, handleTrackPurchase, isTracking, productInfo, scriptStatus, tracked]);
  
  // Verify checkout and set status
  useEffect(() => {
    if (checkoutId) {
      console.log('Checkout ID detected:', checkoutId);
      setCheckoutVerified(true);
    } else {
      console.log('No checkout ID detected - user may have accessed this page directly');
      toast({
        title: "Purchase Not Verified",
        description: "We couldn't verify your purchase. If you've completed checkout, please contact support.",
        variant: "destructive"
      });
    }
  }, [checkoutId, toast]);
  
  // Effect to handle window dimensions for confetti
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
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
      // Only remove the script if we added it
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Get status message and color based on script status
  const getScriptStatusInfo = () => {
    switch (scriptStatus) {
      case 'ready':
        return {
          icon: <Check className="h-4 w-4 text-green-600" />,
          message: "Tracking service connected",
          color: "text-green-800 bg-green-50 border-green-200"
        };
      case 'loading':
        return {
          icon: <RefreshCw className="h-4 w-4 animate-spin text-amber-600" />,
          message: "Connecting to tracking service...",
          color: "text-amber-800 bg-amber-50 border-amber-200"
        };
      case 'timeout':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
          message: "Tracking service connection timed out",
          color: "text-amber-800 bg-amber-50 border-amber-200"
        };
      case 'error':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
          message: "Error connecting to tracking service",
          color: "text-red-800 bg-red-50 border-red-200"
        };
      default:
        return {
          icon: <RefreshCw className="h-4 w-4 text-gray-600" />,
          message: "Checking tracking service...",
          color: "text-gray-800 bg-gray-50 border-gray-200"
        };
    }
  };
  
  const statusInfo = getScriptStatusInfo();

  return (
    <div className="min-h-screen flex flex-col">
      {showConfetti && checkoutVerified && <ReactConfetti width={dimensions.width} height={dimensions.height} recycle={true} numberOfPieces={200} gravity={0.15} />}
      
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
                {checkoutVerified ? "Thank You for Your Purchase!" : "Processing Your Order"}
              </h1>
              
              <p className="text-xl text-gray-700 mb-12">
                {checkoutVerified ? 
                  "You're now officially part of the AI-First Operator Bootcamp!" :
                  "We're processing your order. If you've already completed checkout, you'll receive confirmation soon."}
              </p>
              
              {(scriptStatus === 'timeout' || scriptStatus === 'error') && checkoutVerified && !tracked && (
                <div className={`mb-6 p-4 border rounded-lg text-left ${statusInfo.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {statusInfo.icon}
                    <h3 className="font-bold">{statusInfo.message}</h3>
                  </div>
                  <p className="mb-3">
                    We're having trouble connecting to our tracking service. Your purchase was successful, but we may need to manually record it.
                  </p>
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-2 ${scriptStatus === 'timeout' ? 'border-amber-300 text-amber-800 hover:bg-amber-100' : 'border-red-300 text-red-800 hover:bg-red-100'}`}
                    onClick={handleRetryScriptLoading}
                    disabled={isTracking || scriptStatus === 'loading'}
                  >
                    <RefreshCw className={`h-4 w-4 ${isTracking || scriptStatus === 'loading' ? 'animate-spin' : ''}`} />
                    {isTracking ? 'Connecting...' : scriptStatus === 'loading' ? 'Reconnecting...' : 'Retry Connection'}
                  </Button>
                </div>
              )}
              
              {scriptStatus === 'ready' && tracked && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    <h3 className="font-bold text-green-800">Purchase Successfully Tracked</h3>
                  </div>
                </div>
              )}
              
              {checkoutVerified && (
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
              )}
              
              {checkoutVerified ? (
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
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
                  <p className="text-gray-600 mb-4">
                    If you've completed your purchase but aren't seeing confirmation, please try:
                  </p>
                  <ul className="list-disc ml-5 space-y-2 text-gray-600 text-left mb-6">
                    <li>Refreshing this page</li>
                    <li>Checking your email for purchase confirmation</li>
                    <li>Contacting our support team if issues persist</li>
                  </ul>
                </div>
              )}
              
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
