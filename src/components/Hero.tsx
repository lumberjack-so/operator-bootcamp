
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Join the <span className="highlight">AI-First Movement</span>
          </h1>
          <h3 className="text-xl md:text-2xl font-semibold mb-6">
            AI-First Operator Bootcamp – become the 10 × lever in your team within 90 days
          </h3>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <p className="text-lg text-gray-700">
              24 live sessions • Hands-on • Seats capped at 120 (36 already taken)
            </p>
          </div>
          
          <p className="text-lg mb-8">
            10× operators already automate, delegate and accelerate everything with AI. 
            They write less code, ship faster, and free whole days on their calendar. 
            <span className="font-bold"> This bootcamp turns you into one of them.</span>
          </p>
          
          <div className="mb-12">
            <p className="text-lg font-semibold mb-4">You'll master three pillars:</p>
            <ol className="text-left max-w-2xl mx-auto space-y-2">
              <li className="flex gap-2">
                <span className="font-bold">1.</span> <span><strong>Technical Fundamentals</strong> – Git, APIs, CLI, self-hosting made easy.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span> <span><strong>No-Code Development</strong> – go from total beginner to building production-grade n8n workflows.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span> <span><strong>Vibe-Coding & Agents</strong> – light-code tactics, Cursor, LLM tooling and multi-agent architecture.</span>
              </li>
            </ol>
          </div>
          
          <p className="text-lg font-semibold mb-12">No fluff, just the skills that compound.</p>
          
          <Button size="lg" className="button-primary text-lg px-8 py-6 flex items-center gap-2">
            Grab Your Seat <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
