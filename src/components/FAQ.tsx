
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

const FAQ = () => {
  const faqs = [
    {
      question: "I'm not technical—will I drown?",
      answer: "Nope. Drowning requires deep water; we start you in the kiddie pool and raise the floor each week. By Week 3 you'll brag about your Git commits."
    },
    {
      question: "What if I miss a live call?",
      answer: "Catch the 4K replay, skim the timestamped notes, drop questions in Slack—done. Life happens, automation waits."
    },
    {
      question: "Time-zone issues?",
      answer: "We alternate 9 AM ET / 4 PM ET so both hemispheres stay sane. Worst case: watch the replay over breakfast."
    },
    {
      question: "How much homework are we talking?",
      answer: "About one Netflix episode per week—except you end with workflows, not cliff-hangers."
    },
    {
      question: "I already know n8n basics—too easy for me?",
      answer: "Great! You'll sprint through Weeks 1-3 and feast on advanced agent architecture, Claude Desktop tricks and monetisation modules."
    },
    {
      question: "Corporate card ready—can you invoice?",
      answer: "Yes. VAT-friendly invoices, PO numbers, carrier pigeons—whatever your finance team needs."
    },
    {
      question: "What if I'm still not satisfied?",
      answer: "Take the first two weeks. If you're not automating real stuff by then, email us for a 100% refund. No awkward forms, no \"break-up\" call."
    },
    {
      question: "Software requirements?",
      answer: "Free n8n Desktop/self-host, a GitHub account, Zoom, optional Cursor or VS Code. If your laptop runs Chrome, you're good."
    },
    {
      question: "Do I lose access after 90 days?",
      answer: "Never. Recordings, templates and Slack stay open—automation is a lifelong sport."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Got Cold Feet? 🧊 Quick-Fire FAQ
          </h2>
          
          <div className="mt-12">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold hover:no-underline hover:bg-gray-100">
                    <span>{`"${faq.question}"`}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-12 bg-gray-50 p-8 rounded-xl border border-gray-200">
            <blockquote className="text-lg italic mb-4">
              "I built three client automations before week 8 and closed $4,200 in new MRR."
              <footer className="text-gray-600 mt-2">– <em>Justin S.</em></footer>
            </blockquote>
            
            <p className="mb-6">You're one workflow away from the same. Don't wait.</p>
            
            <Button size="lg" className="button-primary w-full py-6">
              Reserve Your Spot Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
