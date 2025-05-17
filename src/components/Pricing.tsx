
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Heart, Timer, X, Ribbon } from 'lucide-react';
import Countdown from 'react-countdown';
import { Badge } from '@/components/ui/badge';
import PassLogo from '@/components/PassLogo';
import { useNavigate } from 'react-router-dom';
import { getAffonsoReferralId, storePurchaseData } from '@/utils/trackingUtils';
import { toast } from '@/components/ui/sonner';

const Pricing = () => {
  // Set target date to May 31st, 2025 23:59 CET
  const targetDate = new Date('2025-05-31T23:59:00+02:00');
  const navigate = useNavigate();
  
  const pricingPlans = [{
    title: "Builder Pass",
    logo: "/lovable-uploads/cca830e9-c681-4273-94e8-69eff61f6e64.png",
    description: "12 Build-Along sessions + community + replays",
    price: "$197",
    amount: 197,
    fullValue: "$693",
    discount: "72% OFF",
    isPopular: false,
    emoji: "🛠️",
    isEarlyBird: true,
    checkoutUrl: "https://buy.polar.sh/polar_cl_dYdrOWDsH8uiync5fmm7GceGLFzVn8OBHRgJX1440ch"
  }, {
    title: "Operator Pass",
    logo: "/lovable-uploads/2aff9228-17af-428f-a871-7b1132121527.png",
    description: "Combines Deep Dive & Build-Along + perks",
    price: "$347",
    amount: 347,
    fullValue: "$1,747",
    discount: "80% OFF",
    isPopular: true,
    emoji: "✨",
    isEarlyBird: true,
    checkoutUrl: "https://buy.polar.sh/polar_cl_TPSVJn753qmRZXLylW5RiSk60IFKbEY6BK6zK4YJkQq"
  }, {
    title: "VIP Pass",
    logo: "/lovable-uploads/5ce67589-1b06-4944-91c3-594bd472f764.png",
    description: "For true AI-first Operators only",
    price: "$1,497",
    amount: 1497,
    fullValue: "$4,997",
    discount: "70% OFF",
    isPopular: false,
    emoji: "👑",
    checkoutUrl: "https://buy.polar.sh/polar_cl_8NR2YOvtp8MvJLY9klBjxWwpDQS5dI67rDfQR2R6cVl"
  }];

  // Handle checkout button click with Affonso integration
  const handleCheckout = (plan) => {
    // Get referral ID from Affonso
    const referralId = getAffonsoReferralId();
    
    // Create a unique purchase ID (simple implementation)
    const purchaseId = `purchase_${Date.now()}`;
    
    // Store purchase data for retrieval on thank you page
    storePurchaseData({
      purchaseId: purchaseId,
      amount: plan.amount,
      email: "", // Will be collected at checkout
      productName: plan.title
    });
    
    // Prepare checkout URL with referral metadata
    let checkoutUrl = plan.checkoutUrl;
    
    // If there's a referral ID, add it to the checkout URL as a query parameter
    // This assumes Polar can extract it from URL or can be passed via JavaScript integration
    if (referralId) {
      // Adding URL parameter for documentation - ideally this would be handled via Polar's JavaScript SDK
      const separator = checkoutUrl.includes('?') ? '&' : '?';
      checkoutUrl += `${separator}affonso_referral=${encodeURIComponent(referralId)}`;
      console.log(`Checkout with referral ID: ${referralId}`);
      toast.success("Affiliate referral applied!", { duration: 3000 });
    }
    
    // Open checkout in new tab
    window.open(checkoutUrl, '_blank');
    
    
  };

  // Shared features list with yes/no for each plan
  const sharedFeatures = [{
    name: "Access to 12 n8n Tutorial Workshops",
    plans: [true, true, true]
  }, {
    name: "Access to Deep Dive Workshops",
    plans: [false, true, true]
  }, {
    name: "Community Access",
    plans: [true, true, true]
  }, {
    name: "Lifetime Replays",
    plans: [true, true, true]
  }, {
    name: "Live Q&A Participation",
    plans: [false, true, true]
  }, {
    name: "Certificate of Completion",
    plans: [false, true, true]
  }, {
    name: "$300 in AlfredOS Credits",
    plans: [false, true, true]
  }, {
    name: "1-on-1 Private Coaching",
    plans: [false, false, true]
  }, {
    name: "Custom GPT Tutor",
    plans: [false, false, true]
  }, {
    name: "Unlimited DM / Email Support",
    plans: [false, false, true]
  }];

  // Countdown renderer
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed
  }) => {
    if (completed) {
      return <span className="font-bold text-red-500">Offer expired!</span>;
    } else {
      return <div className="inline-flex items-center gap-2 font-mono bg-gray-100 px-3 py-1 rounded-md">
          <span className="bg-black text-white px-2 py-1 rounded">{days}d</span>:
          <span className="bg-black text-white px-2 py-1 rounded">{hours}h</span>:
          <span className="bg-black text-white px-2 py-1 rounded">{minutes}m</span>:
          <span className="bg-black text-white px-2 py-1 rounded">{seconds}s</span>
        </div>;
    }
  };
  return <section id="pricing" className="py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="flex justify-center mb-4">
          <Heart className="h-8 w-8 text-highlight" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Choose Your Path</h2>
        
        <div className="text-center mb-16 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-lg">
            <Timer className="h-5 w-5 text-red-500 animate-pulse" />
            <em>Early bird prices rise in:</em>
          </div>
          <Countdown date={targetDate} renderer={renderer} />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 pt-6 relative">
          {pricingPlans.map((plan, index) => <div key={index} className={`bg-white rounded-xl overflow-hidden border ${plan.isPopular ? 'border-highlight shadow-xl' : 'border-gray-200'} transition-all hover:shadow-lg hover:transform hover:scale-[1.02] group flex flex-col justify-between relative`}>
              {plan.isPopular}
              
              <div className="p-8">
                <PassLogo imageSrc={plan.logo} alt={`${plan.title} Logo`} className="transform group-hover:scale-105 transition-transform duration-300" />
                
                <div className="flex items-center justify-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-center">
                    {plan.title} 
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 min-h-[40px] text-center">{plan.description}</p>
                
                <div className="mb-8 flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.isEarlyBird && <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-300 border-amber-400 animate-pulse">
                      Early Bird
                    </Badge>}
                  {plan.title === "VIP Pass" && <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-400 animate-pulse">
                      10 spots only
                    </Badge>}
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-8 p-3 bg-green-50 border border-green-100 rounded-lg">
                  <span className="text-green-600 font-medium">Full value: {plan.fullValue}</span>
                  <Badge className="bg-green-100 text-green-800 font-bold">
                    {plan.discount}
                  </Badge>
                </div>
                
                <div className="flex flex-col space-y-3 mb-8">
                  {sharedFeatures.map((feature, i) => <div key={i} className="flex items-start">
                      <div className="w-6 h-6 flex-shrink-0 mr-3">
                        {feature.plans[index] ? <Check size={20} className="text-green-500" /> : <X size={20} className="text-red-500" />}
                      </div>
                      <span className={`${!feature.plans[index] ? "text-gray-500" : "text-gray-800"}`}>
                        {feature.name}
                      </span>
                    </div>)}
                </div>
              </div>
              
              <div className="p-8 pt-0 mt-auto">
                <Button 
                  onClick={() => handleCheckout(plan)}
                  className={`w-full py-6 ${plan.isPopular ? 'bg-highlight hover:bg-highlight-dark text-black' : 'bg-gradient-to-r from-saas-accent to-purple-600 hover:from-saas-accent hover:to-purple-700 text-white'} transition-all duration-300 transform hover:scale-[1.03]`}
                >
                  Reserve My Seat
                </Button>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};

export default Pricing;
