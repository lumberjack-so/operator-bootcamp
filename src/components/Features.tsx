
import React from 'react';
import { 
  Award, 
  DollarSign, 
  Code, 
  Bot, 
  Users,
  Star
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Award className="text-highlight h-10 w-10" />,
      title: "12 workflow trophies on your resume.",
      description: "You'll ship one new, production-ready automation every single week—ready to brag on LinkedIn or bill to clients.",
      emoji: "🏆"
    },
    {
      icon: <DollarSign className="text-highlight h-10 w-10" />,
      title: "Pay once, save forever.",
      description: "Graduates cancel an average of $240+/mo in SaaS subscriptions—your tuition pays for itself before week 12 ends.",
      emoji: "💰"
    },
    {
      icon: <Code className="text-highlight h-10 w-10" />,
      title: "Speak fluent API & JSON without writing \"real\" code.",
      description: "Cut through dev jargon, debug like a pro, impress actual engineers.",
      emoji: "👨‍💻"
    },
    {
      icon: <Bot className="text-highlight h-10 w-10" />,
      title: "Run your own local LLMs & agents.",
      description: "Claude Desktop, GPT-4o, multi-agent orchestration—no cloud lock-in, full privacy.",
      emoji: "🤖"
    },
    {
      icon: <DollarSign className="text-highlight h-10 w-10" />,
      title: "Monetise immediately.",
      description: "Clone my $15k/mo client stack, land your first automation retainer, or productise templates for passive sales.",
      emoji: "💵"
    },
    {
      icon: <Users className="text-highlight h-10 w-10" />,
      title: "Never build alone.",
      description: "Slack community, office-hour threads, and a custom GPT tutor that knows the curriculum inside-out.",
      emoji: "👥"
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="flex items-center justify-center mb-3">
          <Star className="text-highlight h-8 w-8" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">
          What Makes This Bootcamp Un-missable
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">{feature.icon}</div>
                <span className="text-4xl">{feature.emoji}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">
                <span>{feature.title}</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
