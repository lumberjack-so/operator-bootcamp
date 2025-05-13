
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const CustomButton = ({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: CustomButtonProps) => {
  
  const variants = {
    primary: "bg-saas-accent hover:bg-blue-700 text-white",
    secondary: "bg-white hover:bg-gray-100 text-saas-text border border-gray-300",
    highlight: "bg-highlight hover:bg-highlight-dark text-black"
  };
  
  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6",
    lg: "py-4 px-8 text-lg"
  };
  
  return (
    <Button 
      className={cn(
        variants[variant],
        sizes[size],
        "font-semibold rounded-lg transition-all",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
