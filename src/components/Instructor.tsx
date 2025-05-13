
import React from 'react';

const Instructor = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Instructor
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-xl border border-gray-100">
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <div className="text-4xl font-bold text-gray-400">YN</div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Your Name</h3>
              <p className="text-gray-700">
                Founder of AlfredOS, writer of <em>The Lumberjack</em>. 400+ students taught, 
                $15k/mo earned from self-hosted automations, 35k newsletter subscribers.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to ditch Zap fatigue?</h3>
            <p className="mb-8">Seats are limited to <strong>120</strong> to keep sessions interactive – 36 already gone.</p>
            
            <a 
              href="#pricing" 
              className="bg-highlight hover:bg-highlight-dark text-black font-bold py-4 px-12 rounded-lg inline-block"
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
