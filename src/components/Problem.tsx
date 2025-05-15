import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, Check, Calendar } from 'lucide-react';
const Problem = () => {
  return <section id="features" className="py-28 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <AlertTriangle className="text-highlight h-8 w-8 inline-block mb-2 mr-3" />
            The Problem We Fix
          </h2>
          
          <p className="text-2xl mb-8 text-center font-medium">
            You're smart, experienced—and still copy-pasting Zaps. 😢
          </p>
          
          <div className="prose prose-lg max-w-none space-y-6 text-lg leading-relaxed">
            <p>
              It's 2025 and the world still runs on Excel. It's the last piece of software that the "rest of us" can use. There's always something that pops up and promises to dethrone the king of spreadsheets with Zaps, prompts, or no-code agents. Yet, even the simplest drag-and-drop solutions end up becoming too technical. Engineers can deal with it, but the rest of us? We're still relegated to Excel. Shitty? Yes. But familiar.
            </p>
            
            <p>
              Here's the uncomfortable truth: <strong>automation tools aren't built for regular humans—they're built for engineers who don't want to admit it</strong>. You're either stuck with spreadsheets or drowning in jargon like APIs, webhooks, and JSON. Sure, you could spend another year dodging command lines and hacking together workflows that barely hold together—or you could escape purgatory.
            </p>
            
            <p>
              They say AI is the great equalizer of skills. That means an AI-First Operator (you, once you're done with the Bootcamp) will always be more capable, more productive, more impactful than just a regular "software operator" (you now).
            </p>
            
            <p>AI-First Operators are already here, with us. They just don't advertise it that much. Their colleagues, business partners are scratching their heads thinking &quot;how much time does this guy have&quot; because their output seems impossible. They're like Hermione in the Prisoner of Azkaban. I'm not just talking about the speed, but also the quality. Their work seems like it's on another level.</p>
            
            <p>
              These people are already becoming indispensable in organizations. They won't necessarily get promoted but they're becoming irreplaceable.
            </p>
            
            <p>
              You're here on this page, reading this copy because you already decided you want to become like that. To become that high leverage, AI-First Operator.
            </p>
            
            <p>
              One that not only thinks about how to automate things but uses an AI-First Operator Stack that does the heavy lifting for them.
            </p>
            
            <p className="font-medium">
              That's why this Bootcamp exists.
            </p>
            
            <p className="text-2xl font-bold text-center mt-8">
              It's automation, for the rest of us.
            </p>
          </div>
          
          <div className="bg-gray-50 p-10 rounded-xl border border-gray-100 mt-12 mb-16 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <Calendar className="text-saas-accent h-6 w-6 mr-3" />
              The 12-Week Fix
            </h3>
            <p className="mb-6 text-lg">Weekly content structure:</p>
            <ol className="mb-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="font-bold text-highlight text-xl">1.</span>
                <span><strong>Deep-Dive Workshop (90 min)</strong> – prerecorded, one core concept, demystified. 🧠</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-highlight text-xl">2.</span>
                <span><strong>Build-Along Session (90 min)</strong> – live interactive, open n8n, ship a workflow together. ⚙️</span>
              </li>
            </ol>
            <p className="font-semibold text-lg flex items-center">
              <Check className="text-green-500 h-5 w-5 mr-2" />
              Leave Week 12 with a portfolio of 12 revenue-ready automations and the skill set to build dozens more.
            </p>
          </div>
          
          <div className="flex justify-center w-full">
            <Button size="lg" className="button-primary flex items-center gap-3 px-10 py-7 text-lg" onClick={() => document.getElementById('pricing')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Grab Your Seat <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Problem;