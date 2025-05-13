
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Clock } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-5">
            <Sparkles className="text-highlight h-10 w-10" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
            Join the <span className="highlight">AI-First Movement</span>
          </h1>
          
          <h3 className="text-xl md:text-2xl font-semibold mb-10 leading-relaxed">
            AI-First Operator Bootcamp – become the 10× lever in your team within 90 days
          </h3>
          
          <div className="bg-gray-100 p-6 rounded-xl mb-10 shadow-inner">
            <p className="text-lg text-gray-700 flex items-center justify-center gap-3">
              <Clock className="text-saas-accent h-5 w-5" />
              <span>24 live sessions</span>
              <span className="mx-1">•</span>
              <span>Hands-on</span>
              <span className="mx-1">•</span>
              <span>Seats capped at <strong>120</strong> (36 already taken)</span>
            </p>
          </div>
          
          <p className="text-lg mb-12 max-w-3xl mx-auto leading-relaxed">
            10× operators already automate, delegate and accelerate everything with AI. 
            They write less code, ship faster, and free whole days on their calendar. 
            <span className="font-bold"> This bootcamp turns you into one of them. ✨</span>
          </p>
          
          <div className="mb-16">
            <p className="text-xl font-semibold mb-6 flex items-center justify-center">
              <Zap className="text-highlight mr-2 h-6 w-6" /> You'll master three pillars:
            </p>
            <ol className="text-left max-w-2xl mx-auto space-y-4 bg-white p-8 rounded-xl shadow-sm">
              <li className="flex items-start gap-3">
                <span className="font-bold text-highlight text-xl">1.</span> 
                <span><strong>Technical Fundamentals</strong> – Git, APIs, CLI, self-hosting made easy. 🛠️</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-highlight text-xl">2.</span> 
                <span><strong>No-Code Development</strong> – go from total beginner to building production-grade n8n workflows. 🔄</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-highlight text-xl">3.</span> 
                <span><strong>Vibe-Coding & Agents</strong> – light-code tactics, Cursor, LLM tooling and multi-agent architecture. 🤖</span>
              </li>
            </ol>
          </div>
          
          <p className="text-xl font-semibold mb-14">No fluff, just the skills that compound. 🚀</p>
          
          <Button size="lg" className="button-primary text-lg px-10 py-7 flex items-center gap-3">
            Grab Your Seat <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
