
import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

const ProgramStructure = () => {
  // Program structure data
  const programWeeks = [
    { week: 1, deepDive: "Getting Started with n8n", buildAlong: "Personal \"daily digest\" automation" },
    { week: 2, deepDive: "GitHub Essentials", buildAlong: "Google Sheets → Slack report" },
    { week: 3, deepDive: "APIs Explained", buildAlong: "Gmail zero-inbox bot" },
    { week: 4, deepDive: "Building an App from Scratch", buildAlong: "Twitter → Notion content pipeline" },
    { week: 5, deepDive: "Model Context Protocol Basics", buildAlong: "AI-powered lead-qualifier" },
    { week: 6, deepDive: "Creating AI Agents in n8n", buildAlong: "Stripe failed-payment recovery" },
    { week: 7, deepDive: "Using Claude Desktop as Your COO", buildAlong: "Multi-step document QA agent" },
    { week: 8, deepDive: "Designing AI Agent Workflows", buildAlong: "Blog-to-Podcast generator" },
    { week: 9, deepDive: "Supabase for Your Backend", buildAlong: "Auto-backup & alert workflow" },
    { week: 10, deepDive: "Simple App Hosting", buildAlong: "Self-healing web-scraper" },
    { week: 11, deepDive: "Your AI-First Operator Stack", buildAlong: "Client onboarding automation" },
    { week: 12, deepDive: "My $15K/mo Automation Setup", buildAlong: "\"Ask Me Anything\" + launch prep" }
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
