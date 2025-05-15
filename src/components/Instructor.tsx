
import React from 'react';
import { Award, Heart } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Instructor = () => {
  return (
    <section className="py-28 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Award className="h-8 w-8 text-highlight" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Meet Your Instructor
          </h2>
          
          <div className="flex flex-col md:flex-row gap-10 items-center bg-white p-10 rounded-xl border border-gray-100 shadow-sm mb-20">
            <Avatar className="w-40 h-40">
              <AvatarImage 
                src="/lovable-uploads/bed719ce-a6b9-472c-bc52-5f1c5288212c.png" 
                alt="David Szabo-Stuban" 
                className="object-cover"
              />
              <AvatarFallback className="text-4xl font-bold text-gray-400">DS</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="text-2xl font-bold mb-5">David Szabo-Stuban 👋</h3>
              <p className="text-gray-700 leading-relaxed">
                Indie hacker, 4x founder, soon to be girl dad. 30+ products shipped in 13 years, 
                10k+ students taught in AI. First ML startup in 2015. AI Architect at Stylers Group by day, 
                author at Lumberjack by night (7k subscribers). Passionate about turning regular people into builders! ✨
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <Heart className="text-red-500 h-6 w-6 mr-3" />
              Ready to ditch Zap fatigue?
            </h3>
            <p className="mb-10 text-lg">Seats are limited to <strong>120</strong> to keep sessions interactive – 36 already gone. ⏲️</p>
            
            <a 
              href="#pricing" 
              className="bg-highlight hover:bg-highlight-dark text-black font-bold py-5 px-14 rounded-lg inline-block shadow-sm hover:shadow-md transition-all text-lg"
            >
              I'M IN → 
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
