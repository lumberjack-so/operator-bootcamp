
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { HelpCircle, MessageSquare, Calendar, VideoIcon } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "When does the bootcamp start?",
      answer: "The bootcamp officially starts on July 2nd, 2025. Mark your calendar and get ready to transform your workflows!",
      emoji: "📅"
    },
    {
      question: "What's the format of the workshops?",
      answer: "Deep dive workshops are prerecorded videos (up to 60 minutes each) that you can watch at your own pace. The n8n builder workshops are conducted live for interactive learning and real-time problem solving.",
      emoji: "🎥"
    },
    {
      question: "I'm not technical—will I drown?",
      answer: "Nope. Drowning requires deep water; we start you in the kiddie pool and raise the floor each week. By Week 3 you'll brag about your Git commits.",
      emoji: "🏊‍♂️"
    },
    {
      question: "What if I miss a live call?",
      answer: "Catch the 4K replay, skim the timestamped notes, drop questions in the Community—done. Life happens, automation waits.",
      emoji: "🎬"
    },
    {
      question: "Time-zone issues?",
      answer: "We alternate 9 AM ET / 4 PM ET so both hemispheres stay sane. Worst case: watch the replay over breakfast.",
      emoji: "🌍"
    },
    {
      question: "How much homework are we talking?",
      answer: "About one Netflix episode per week—except you end with workflows, not cliff-hangers.",
      emoji: "📚"
    },
    {
      question: "I already know n8n basics—too easy for me?",
      answer: "Great! You'll sprint through Weeks 1-3 and feast on advanced agent architecture, Claude Desktop tricks and monetisation modules.",
      emoji: "🚀"
    },
    {
      question: "Corporate card ready—can you invoice?",
      answer: "Yes. VAT-friendly invoices, PO numbers, carrier pigeons—whatever your finance team needs.",
      emoji: "💳"
    },
    {
      question: "What if I'm still not satisfied?",
      answer: "Take the first two weeks. If you're not automating real stuff by then, email us for a 100% refund. No awkward forms, no \"break-up\" call.",
      emoji: "🔙"
    },
    {
      question: "Software requirements?",
      answer: "Free n8n Desktop/self-host, a GitHub account, Zoom, optional Cursor or VS Code. If your laptop runs Chrome, you're good.",
      emoji: "💻"
    },
    {
      question: "Do I lose access after 90 days?",
      answer: "Never. Recordings, templates and Community stay open—automation is a lifelong sport.",
      emoji: "🔐"
    }
  ];

  return (
    <section id="faq" className="py-28 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-highlight" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Got Cold Feet? 🧊 Quick-Fire FAQ
          </h2>
          
          <p className="text-center text-gray-600 mb-12">Everything you need to know before joining</p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 flex items-center">
            <Calendar className="h-6 w-6 text-amber-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-amber-800 mb-1">Important Dates:</h3>
              <p className="text-amber-700">The AI-First Operator Bootcamp officially starts on <span className="font-bold">July 2nd, 2025</span>.</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12 flex items-center">
            <VideoIcon className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-800 mb-1">Workshop Format:</h3>
              <p className="text-blue-700"><span className="font-bold">Deep dive workshops:</span> Prerecorded videos up to 60 minutes each.</p>
              <p className="text-blue-700"><span className="font-bold">n8n builder workshops:</span> Live interactive sessions.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <AccordionTrigger className="px-8 py-5 text-left font-semibold hover:no-underline hover:bg-gray-100">
                    <span className="flex items-center">
                      <span className="text-2xl mr-3">{faq.emoji}</span>
                      <span>{`"${faq.question}"`}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 py-5 bg-white">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-16 bg-gray-50 p-10 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center mb-5">
              <MessageSquare className="text-highlight h-6 w-6 mr-3" />
              <span className="text-xl font-medium">From our students</span>
            </div>
            
            <blockquote className="text-lg italic mb-6">
              "I built three client automations before week 8 and closed $4,200 in new MRR."
              <footer className="text-gray-600 mt-3">– <em>Justin S.</em></footer>
            </blockquote>
            
            <p className="mb-8 text-lg">You're one workflow away from the same. Don't wait. ⏱️</p>
            
            <Button size="lg" className="button-primary w-full py-7 text-lg">
              Reserve Your Spot Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
