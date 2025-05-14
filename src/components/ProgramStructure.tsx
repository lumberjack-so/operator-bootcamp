
import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

const ProgramStructure = () => {
  // Program structure data
  const programWeeks = [
    { week: 1, deepDive: "n8n Basics (Fast-Track)", buildAlong: "Personal \"daily digest\" automation" },
    { week: 2, deepDive: "Speak Like a Techie (Git/GitHub crash course)", buildAlong: "Google Sheets → Slack report" },
    { week: 3, deepDive: "Cursor for Non-Coders", buildAlong: "Gmail zero-inbox bot" },
    { week: 4, deepDive: "APIs in Plain English", buildAlong: "Twitter → Notion content pipeline" },
    { week: 5, deepDive: "Build an App from Scratch with Vibe-Coding", buildAlong: "AI-powered lead-qualifier" },
    { week: 6, deepDive: "Advanced n8n Techniques", buildAlong: "Stripe failed-payment recovery" },
    { week: 7, deepDive: "Claude Desktop & MCP Servers", buildAlong: "Multi-step document QA agent" },
    { week: 8, deepDive: "Designing AI Agent Architecture", buildAlong: "Blog-to-Podcast generator" },
    { week: 9, deepDive: "Error Handling & Monitoring", buildAlong: "Auto-backup & alert workflow" },
    { week: 10, deepDive: "Deployment & Hosting Best Practices", buildAlong: "Self-healing web-scraper" },
    { week: 11, deepDive: "Monetising Your Automations", buildAlong: "Client onboarding automation" },
    { week: 12, deepDive: "My $15 k/mo Commercial Setup", buildAlong: "\"Ask Me Anything\" + launch prep" }
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
