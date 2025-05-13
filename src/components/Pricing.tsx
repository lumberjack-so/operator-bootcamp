
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Heart, Clock } from 'lucide-react';

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Single Deep Dive",
      description: "1 workshop + assets",
      price: "$77",
      isPopular: false,
      emoji: "🎯",
      features: ["Access to one workshop", "Related assets", "14-day replay access"]
    },
    {
      title: "Bootcamp Pass",
      description: "12 Build-Along sessions + community + replays",
      price: "$247 EB / $497",
      isPopular: true,
      emoji: "🚀",
      features: ["All 12 build-along sessions", "Community access", "Lifetime replays", "Workshop assets"]
    },
    {
      title: "All-Access Pass",
      description: "Bootcamp Pass + all 12 Deep Dives + assets",
      price: "$397 EB / $697",
      isPopular: false,
      emoji: "🌟",
      features: ["All Bootcamp Pass features", "All 12 Deep-Dive workshops", "Complete asset library", "Certificate of completion"]
    },
    {
      title: "PRO Cohort",
      description: "All-Access ➕ $300 AlfredOS credits ➕ 1-on-1 kickoff ➕ mid-game & finale calls ➕ custom GPT tutor ➕ unlimited DMs",
      subtext: "(10 seats)",
      price: "$1,497",
      isPopular: false,
      emoji: "👑",
      features: ["Everything in All-Access", "$300 AlfredOS credits", "1-on-1 kickoff call", "Mid-program & finale calls", "Custom GPT tutor", "Unlimited DMs with instructor"]
    }
  ];

  return (
    <section id="pricing" className="py-28 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-center mb-4">
          <Heart className="h-8 w-8 text-highlight" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Choose Your Path</h2>
        
        <p className="text-center mb-16 text-lg flex items-center justify-center">
          <Clock className="h-5 w-5 mr-2 text-saas-accent" />
          <em>prices rise in... ⏳</em>
        </p>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl overflow-hidden border ${
                plan.isPopular ? 'border-highlight shadow-lg' : 'border-gray-200'
              } transition-all hover:shadow-md`}
            >
              {plan.isPopular && (
                <div className="bg-highlight text-black py-3 text-center font-bold">
                  MOST POPULAR
                </div>  
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{plan.emoji}</span>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {plan.title} 
                    {plan.subtext && <span className="text-sm font-normal text-gray-500">{plan.subtext}</span>}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-3xl font-bold">{plan.price}</span>
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
                  className={`w-full py-6 ${plan.isPopular ? 'bg-highlight hover:bg-highlight-dark text-black' : 'button-primary'}`}
                >
                  Reserve My Seat
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-8 text-gray-600">
          <em>Early-bird pricing ends when 50 seats are gone or <strong>May 31st</strong>, whichever comes first. ⏰</em>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
