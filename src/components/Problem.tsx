
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Problem = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            The Problem We Fix
          </h2>
          
          <p className="text-xl mb-6">
            You're smart, experienced—and still copy-pasting Zaps.
          </p>
          
          <ul className="mb-8 space-y-3">
            <li className="flex items-start gap-2">
              <span>•</span> 
              <span>Your SaaS stack bleeds <strong>$200+ every month</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span> 
              <span>Anything that looks like a terminal makes you slam the laptop shut.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>•</span> 
              <span>The AI gold-rush is here, but you're stuck on the sideline.</span>
            </li>
          </ul>
          
          <p className="text-lg mb-10">
            Sound familiar? You're not alone. Hundreds of "elder-millennial" founders and operators told us the same thing. 
            <strong> They know automation is the leverage play, yet the leap from drag-and-drop to production workflows feels impossible.</strong>
          </p>
          
          <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 mb-12">
            <h3 className="text-2xl font-bold mb-6">The 12-Week Fix</h3>
            <p className="mb-4">Two live calls every week:</p>
            <ol className="mb-6 space-y-3">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span><strong>Deep-Dive Workshop (90 min)</strong> – one core concept, demystified.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span><strong>Build-Along Session (90 min)</strong> – open n8n, ship a workflow together.</span>
              </li>
            </ol>
            <p className="font-semibold">
              Leave Week 12 with a portfolio of 12 revenue-ready automations and the skill set to build dozens more.
            </p>
          </div>
          
          <div className="text-center">
            <Button size="lg" className="button-primary flex items-center gap-2">
              Grab Your Seat <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
