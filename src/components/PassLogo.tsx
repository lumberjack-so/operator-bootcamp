
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
      <AspectRatio ratio={1 / 1}>
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
