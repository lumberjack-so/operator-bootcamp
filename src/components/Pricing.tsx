
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Heart, Timer } from 'lucide-react';
import Countdown from 'react-countdown';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  // Set target date to May 31st, 2025 23:59 CET
  const targetDate = new Date('2025-05-31T23:59:00+02:00');

  const pricingPlans = [
    {
      title: "Deep Dive Pass",
      description: "All 12 workshops + assets",
      price: "$197",
      fullValue: "$564",
      discount: "65% OFF",
      isPopular: false,
      emoji: "🎯",
      features: ["Access to all 12 deep-dive workshops", "Workshop presentation slides", "Code samples & templates", "14-day replay access"]
    },
    {
      title: "Build-Along Pass",
      description: "12 Build-Along sessions + community + replays",
      price: "$247",
      fullValue: "$693",
      discount: "64% OFF",
      isPopular: false,
      emoji: "🛠️",
      isEarlyBird: true,
      features: ["All 12 build-along sessions", "Community access", "Lifetime replays ($99 value)", "Workshop assets", "Live Q&A participation ($99 value)"]
    },
    {
      title: "All-Access Pass",
      description: "Combines Deep Dive & Build-Along + perks",
      price: "$397",
      fullValue: "$1,257",
      discount: "68% OFF",
      isPopular: true,
      emoji: "✨",
      isEarlyBird: true,
      features: ["All Deep Dive workshops", "All Build-Along sessions", "Complete asset library ($200 value)", "Priority Q&A access", "Certificate of completion"]
    },
    {
      title: "PRO Cohort",
      description: "All-Access ➕ $300 AlfredOS credits ➕ 1-on-1 kickoff ➕ mid-game & finale calls ➕ custom GPT tutor",
      subtext: "(Only 10 seats)",
      price: "$1,497",
      fullValue: "$3,007",
      discount: "50% OFF",
      isPopular: false,
      emoji: "👑",
      features: ["Everything in All-Access", "$300 AlfredOS credits", "1-on-1 kickoff call ($250 value)", "Mid-program & finale calls ($500 value)", "Custom GPT tutor ($500 value)", "Unlimited DMs with instructor"]
    }
  ];

  // Countdown renderer
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="font-bold text-red-500">Offer expired!</span>;
    } else {
      return (
        <div className="inline-flex items-center gap-2 font-mono bg-gray-100 px-3 py-1 rounded-md">
          <span className="bg-black text-white px-2 py-1 rounded">{days}d</span>:
          <span className="bg-black text-white px-2 py-1 rounded">{hours}h</span>:
          <span className="bg-black text-white px-2 py-1 rounded">{minutes}m</span>:
          <span className="bg-black text-white px-2 py-1 rounded">{seconds}s</span>
        </div>
      );
    }
  };

  return (
    <section id="pricing" className="py-28 bg-gradient-to-b from-gray-50 to-white">
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
        
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl overflow-hidden border ${
                plan.isPopular ? 'border-highlight shadow-xl' : 'border-gray-200'
              } transition-all hover:shadow-lg hover:transform hover:scale-[1.02] group`}
            >
              {plan.isPopular && (
                <div className="bg-highlight text-black py-3 text-center font-bold">
                  BEST VALUE 🌟
                </div>  
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl group-hover:animate-bounce">{plan.emoji}</span>
                  <h3 className="text-xl font-bold flex items-center gap-2 flex-wrap">
                    {plan.title} 
                    {plan.subtext && <span className="text-sm font-normal text-rose-500">{plan.subtext}</span>}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-6 min-h-[40px]">{plan.description}</p>
                
                <div className="mb-8 flex items-center gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.isEarlyBird && (
                    <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-300 border-amber-400 animate-pulse">
                      Early Bird
                    </Badge>
                  )}
                  {plan.title === "PRO Cohort" && (
                    <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-400 animate-pulse">
                      10 spots only
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-8 p-3 bg-green-50 border border-green-100 rounded-lg">
                  <span className="text-green-600 font-medium">Full value: {plan.fullValue}</span>
                  <Badge className="bg-green-100 text-green-800 font-bold">
                    {plan.discount}
                  </Badge>
                </div>
                
                <ul className="mb-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-6 ${
                    plan.isPopular 
                      ? 'bg-highlight hover:bg-highlight-dark text-black' 
                      : 'bg-gradient-to-r from-saas-accent to-purple-600 hover:from-saas-accent hover:to-purple-700 text-white'
                  } transition-all duration-300 transform hover:scale-[1.03]`}
                >
                  Reserve My Seat
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-10 text-gray-600 bg-gray-50 p-4 rounded-lg inline-block mx-auto">
          <em>Early-bird pricing ends when 50 seats are gone or <strong>May 31st, 2025</strong>, whichever comes first. ⏰</em>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
