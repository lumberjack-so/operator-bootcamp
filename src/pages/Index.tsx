
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import ProgramStructure from '@/components/ProgramStructure';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Instructor from '@/components/Instructor';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Problem />
        <ProgramStructure />
        <Features />
        <Pricing />
        <FAQ />
        <Instructor />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
