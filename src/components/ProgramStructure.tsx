
import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

const ProgramStructure = () => {
  // Program structure data
  const programWeeks = [
    { week: 1, deepDive: "Getting Started with n8n", buildAlong: "Clean Unwanted Emails from Your Inbox" },
    { week: 2, deepDive: "GitHub Essentials", buildAlong: "Back Up Your n8n Workflows to GitHub" },
    { week: 3, deepDive: "APIs Explained", buildAlong: "Generate Briefings of a Lead Before a Call" },
    { week: 4, deepDive: "Building an App from Scratch", buildAlong: "Turn News into Podcast Recordings" },
    { week: 5, deepDive: "Model Context Protocol Basics", buildAlong: "Hyperpersonalized Email Nurturing for Customers" },
    { week: 6, deepDive: "Creating AI Agents in n8n", buildAlong: "AI-Based Email Processing" },
    { week: 7, deepDive: "Cursor for Non-Coding Tasks", buildAlong: "n8n-Based MCP Chat Agent" },
    { week: 8, deepDive: "Designing AI Agent Workflows", buildAlong: "Generate Tasks, Calendar Events, and Emails from Meeting Transcripts" },
    { week: 9, deepDive: "Supabase for Your Backend", buildAlong: "Automated Lead Generation" },
    { week: 10, deepDive: "Simple App Hosting", buildAlong: "Voice Agent (ElevenLabs and n8n)" },
    { week: 11, deepDive: "Your AI-First Operator Stack", buildAlong: "Multi-Agent Personal Assistant" },
    { week: 12, deepDive: "My $15K/mo Automation Setup", buildAlong: "Automated Proposal Generation" }
  ];

  return (
    <section id="program" className="py-28 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-4">
            <Calendar className="h-8 w-8 text-highlight" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Program Structure (Week-by-Week)
          </h2>
          
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-sm">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-5 px-6 text-left">Week</th>
                  <th className="py-5 px-6 text-left">Deep-Dive Workshop</th>
                  <th className="py-5 px-6 text-left">Build-Along Focus</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {programWeeks.map((week) => (
                  <tr key={week.week} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-semibold">{week.week}</td>
                    <td className="py-5 px-6">{week.deepDive}</td>
                    <td className="py-5 px-6">{week.buildAlong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-center mt-8 bg-white p-4 rounded-lg shadow-sm inline-block mx-auto">
            <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
            <p className="text-gray-600 italic">
              All sessions recorded in 4K & timestamped for easy replay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramStructure;
