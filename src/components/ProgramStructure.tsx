import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
const ProgramStructure = () => {
  // Program structure data
  const programWeeks = [{
    week: 1,
    deepDive: "Getting Started with n8n",
    buildAlong: "Clean Unwanted Emails from Your Inbox",
    learnings: ["How to set up your first automated workflow", "Introduction to n8n interface", "Testing your flow so it just works"]
  }, {
    week: 2,
    deepDive: "GitHub Essentials",
    buildAlong: "Back Up Your n8n Workflows to GitHub",
    learnings: ["Saving and organizing your automations in the cloud", "Sharing and restoring your work with a few clicks", "Peace of mind with version history"]
  }, {
    week: 3,
    deepDive: "APIs Explained",
    buildAlong: "Generate Briefings of a Lead Before a Call",
    learnings: ["Pulling in data from other services automatically", "Turning raw info into neat summaries", "No-code ways to connect different apps"]
  }, {
    week: 4,
    deepDive: "Building an App from Scratch",
    buildAlong: "Turn News into Podcast Recordings",
    learnings: ["Converting text news into audio files", "Making your creation available to listeners", "Stitching together steps to make a mini-app"]
  }, {
    week: 5,
    deepDive: "Model Context Protocol Basics",
    buildAlong: "Hyperpersonalized Email Nurturing for Customers",
    learnings: ["Enrich nurture emails with personalized Perplexity searches", "Use n8n's MCP tools", "Keeping your messages fresh and relevant"]
  }, {
    week: 6,
    deepDive: "Cursor for Non-Coding Tasks",
    buildAlong: "n8n-Based MCP Chat Agent",
    learnings: ["Using Cursor with MCPs to automate everyday tasks", "Building the same MCP powered agent in n8n", "Coordinate AI tools in a smooth workflow"]
  }, {
    week: 7,
    deepDive: "Creating AI Agents in n8n",
    buildAlong: "AI-Based Email Processing",
    learnings: ["Setting up an AI helper to sort and summarize mail", "Hands-off triage: let your agent decide what's important", "Routing messages where they belong"]
  }, {
    week: 8,
    deepDive: "Designing AI Agent Workflows",
    buildAlong: "Generate Tasks, Calendar Events, and Emails from Meeting Transcripts",
    learnings: ["Mapping out step-by-step processes for your AI helper", "Passing context naturally between steps", "Differences between agents and workflows"]
  }, {
    week: 9,
    deepDive: "Supabase for Your Backend",
    buildAlong: "Automated Lead Generation",
    learnings: ["Quickly storing and viewing your leads online", "Capturing new contacts automatically", "Keeping your list clean and up to date"]
  }, {
    week: 10,
    deepDive: "Simple App Hosting",
    buildAlong: "Voice Agent (ElevenLabs and n8n)",
    learnings: ["Putting your assistant online so anyone can reach it", "Adding voice input/output to your n8n agents", "Sharing your service with a public link"]
  }, {
    week: 11,
    deepDive: "Your AI-First Operator Stack",
    buildAlong: "Multi-Agent Personal Assistant",
    learnings: ["Bringing all your tools together smoothly", "Having multiple AI helpers work in harmony", "Handing off tasks to AI first, human second"]
  }, {
    week: 12,
    deepDive: "My $15K/mo Automation Setup",
    buildAlong: "Automated Proposal Generation",
    learnings: ["Turnkey commercial setup", "Auto-drafting professional proposals in seconds", "Delivering value (and invoices) on autopilot"]
  }];
  return <section id="program" className="py-28 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-4">
            <Calendar className="h-8 w-8 text-highlight" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Program Structure</h2>
          
          <div className="overflow-x-auto bg-white p-6 rounded-xl shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Week</TableHead>
                  <TableHead>Deep-Dive Workshop</TableHead>
                  <TableHead>Build-Along Focus</TableHead>
                  <TableHead>What You'll Learn</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programWeeks.map(week => <TableRow key={week.week}>
                    <TableCell className="font-semibold">{week.week}</TableCell>
                    <TableCell>{week.deepDive}</TableCell>
                    <TableCell>{week.buildAlong}</TableCell>
                    <TableCell>
                      <ul className="list-disc ml-5 space-y-1">
                        {week.learnings.map((learning, index) => <li key={index} className="text-sm">{learning}</li>)}
                      </ul>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-center mt-8 bg-white p-4 rounded-lg shadow-sm inline-block mx-auto">
            <CheckCircle className="text-green-500 h-5 w-5 mr-2" />
            <p className="text-gray-600 italic">
              All sessions recorded in 4K & timestamped for easy replay.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default ProgramStructure;