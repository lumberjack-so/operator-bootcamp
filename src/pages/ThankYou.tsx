
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Check, MailOpen, PartyPopper, Server } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ReactConfetti from 'react-confetti';
import { useToast } from '@/hooks/use-toast';

// Define a type for the product information
interface ProductInfo {
  productId: string;
  productName: string;
  productPrice: number;
}

const ThankYou = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0
  });
  const [showConfetti, setShowConfetti] = useState(true);
  const [vimeoLoaded, setVimeoLoaded] = useState(false);
  const [checkoutVerified, setCheckoutVerified] = useState(false);
  const [affonsoReady, setAffonsoReady] = useState(false);
  const [tracked, setTracked] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  // This effect deals with the Affonso script loading detection
  useEffect(() => {
    console.log("Checking for Affonso script...");
    
    // Check if Affonso is already loaded
    if (window.Affonso && typeof window.Affonso.purchase === 'function') {
      console.log("Affonso script already loaded!");
      setAffonsoReady(true);
      return;
    }
    
    // Set up a more robust detection for the Affonso script
    const intervalId = setInterval(() => {
      if (window.Affonso && typeof window.Affonso.purchase === 'function') {
        console.log("Affonso script loaded and ready!");
        setAffonsoReady(true);
        clearInterval(intervalId);
      } else {
        console.log("Waiting for Affonso script to load...");
      }
    }, 1000); // Check every second
    
    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
      console.log("Cleaned up Affonso detection interval");
    };
  }, []);
  
  useEffect(() => {
    // Check if this page was accessed with a checkout_id parameter
    const searchParams = new URLSearchParams(location.search);
    const checkoutId = searchParams.get('checkout_id');
    
    if (checkoutId) {
      console.log('Checkout ID detected:', checkoutId);
      // If we have a checkout ID from Polar, we can assume the purchase was completed
      setCheckoutVerified(true);
      
      // Get product details from multiple sources with fallbacks
      
      // 1. First try URL parameters (primary source)
      const productId = searchParams.get('product_id');
      const productName = searchParams.get('product_name');
      const productPrice = searchParams.get('product_price');
      
      let productInfo: ProductInfo;
      
      if (productId && productName && productPrice) {
        // Product info found in URL parameters
        console.log('Retrieved product info from URL parameters');
        productInfo = {
          productId: productId,
          productName: decodeURIComponent(productName),
          productPrice: parseFloat(productPrice)
        };
        console.log('Product info from URL:', productInfo);
      } else {
        // 2. Try localStorage if URL parameters aren't available
        console.log('No product info in URL, checking localStorage...');
        const planInfoStr = localStorage.getItem('selectedPlan');
        
        if (planInfoStr) {
          try {
            const parsedInfo = JSON.parse(planInfoStr);
            console.log('Retrieved product info from localStorage:', parsedInfo);
            
            // Ensure we have all required fields
            productInfo = {
              productId: parsedInfo.productId || 'bootcamp-purchase',
              productName: parsedInfo.productName || 'AI-First Operator Bootcamp',
              productPrice: parsedInfo.productPrice || 0
            };
          } catch (error) {
            console.error('Error parsing product info from localStorage:', error);
            // 3. Fallback to default values
            productInfo = {
              productId: 'bootcamp-purchase',
              productName: 'AI-First Operator Bootcamp',
              productPrice: 0
            };
          }
        } else {
          console.log('No product info found in localStorage');
          // Fallback to default values
          productInfo = {
            productId: 'bootcamp-purchase',
            productName: 'AI-First Operator Bootcamp',
            productPrice: 0
          };
        }
      }
      
      // Track purchase with Affonso only if we have a checkout ID from Polar
      // and Affonso is ready
      const trackPurchase = () => {
        if (!tracked && affonsoReady) {
          console.log('Tracking verified purchase with Affonso:', { 
            checkoutId,
            ...productInfo
          });
          
          try {
            // Track the purchase
            window.Affonso.purchase({
              // Use checkout ID as order ID if available
              id: checkoutId || `order-${Date.now()}`,
              amount: productInfo.productPrice,
              currency: 'USD',
              products: [{
                id: productInfo.productId,
                name: productInfo.productName,
                price: productInfo.productPrice,
                quantity: 1
              }]
            });
            
            console.log('✅ Successfully tracked purchase with Affonso');
            setTracked(true);
            
            toast({
              title: "Purchase Tracked",
              description: "Your purchase has been successfully recorded. Thank you!",
              variant: "default"
            });
            
            // Clear localStorage after successful tracking
            localStorage.removeItem('selectedPlan');
            console.log('Cleared product info from localStorage');
          } catch (error) {
            console.error('Error tracking purchase with Affonso:', error);
            toast({
              title: "Tracking Error",
              description: "There was an error recording your purchase. Our team has been notified.",
              variant: "destructive"
            });
          }
        } else if (tracked) {
          console.log('Purchase already tracked, skipping');
        } else {
          console.log('Cannot track purchase yet, Affonso not ready');
        }
      };
      
      // Check if we can track the purchase now
      if (affonsoReady) {
        trackPurchase();
      }
    } else {
      console.log('No checkout ID detected - user may have accessed this page directly');
      // Show a message if the page was accessed without a checkout ID
      toast({
        title: "Purchase Not Verified",
        description: "We couldn't verify your purchase. If you've completed checkout, please contact support.",
        variant: "destructive"
      });
    }
    
    // Fixed: Moving the dependent useEffect into this one to fix React error #321
    // This effect runs whenever affonsoReady changes
    if (checkoutId && affonsoReady && !tracked) {
      console.log('Affonso is ready, attempting to track purchase');
      // We need to call trackPurchase again here since it's defined above
      if (!tracked && affonsoReady) {
        const productId = searchParams.get('product_id');
        const productName = searchParams.get('product_name');
        const productPrice = searchParams.get('product_price');
        
        let productInfo: ProductInfo;
        
        if (productId && productName && productPrice) {
          productInfo = {
            productId: productId,
            productName: decodeURIComponent(productName),
            productPrice: parseFloat(productPrice)
          };
        } else {
          const planInfoStr = localStorage.getItem('selectedPlan');
          if (planInfoStr) {
            try {
              const parsedInfo = JSON.parse(planInfoStr);
              productInfo = {
                productId: parsedInfo.productId || 'bootcamp-purchase',
                productName: parsedInfo.productName || 'AI-First Operator Bootcamp',
                productPrice: parsedInfo.productPrice || 0
              };
            } catch (error) {
              productInfo = {
                productId: 'bootcamp-purchase',
                productName: 'AI-First Operator Bootcamp',
                productPrice: 0
              };
            }
          } else {
            productInfo = {
              productId: 'bootcamp-purchase',
              productName: 'AI-First Operator Bootcamp',
              productPrice: 0
            };
          }
        }
        
        try {
          window.Affonso.purchase({
            id: checkoutId || `order-${Date.now()}`,
            amount: productInfo.productPrice,
            currency: 'USD',
            products: [{
              id: productInfo.productId,
              name: productInfo.productName,
              price: productInfo.productPrice,
              quantity: 1
            }]
          });
          
          setTracked(true);
          localStorage.removeItem('selectedPlan');
          
          toast({
            title: "Purchase Tracked",
            description: "Your purchase has been successfully recorded. Thank you!",
            variant: "default"
          });
        } catch (error) {
          console.error('Error tracking purchase with Affonso:', error);
        }
      }
    }
  }, [location.search, toast, affonsoReady, tracked]);

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
