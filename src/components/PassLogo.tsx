
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

interface PassLogoProps {
  imageSrc: string;
  alt: string;
  className?: string;
}

const PassLogo = ({ imageSrc, alt, className }: PassLogoProps) => {
  return (
    <div className={cn("w-full max-w-[160px] mx-auto mb-6", className)}>
      <AspectRatio ratio={1 / 1} className="bg-[#FEF7E0] rounded-xl overflow-hidden border-2 border-amber-200 shadow-md">
        <img 
          src={imageSrc} 
          alt={alt} 
          className="w-full h-full object-contain p-2" 
        />
      </AspectRatio>
    </div>
  );
};

export default PassLogo;
