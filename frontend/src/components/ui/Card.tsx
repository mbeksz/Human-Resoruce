import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div 
      className={twMerge(
        'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div 
      className={twMerge(
        'px-6 py-4 border-b border-gray-200 bg-gray-50',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle = ({ children, className }: CardTitleProps) => {
  return (
    <h3 
      className={twMerge(
        'text-lg font-medium text-gray-900',
        className
      )}
    >
      {children}
    </h3>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div 
      className={twMerge(
        'px-6 py-4',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div 
      className={twMerge(
        'px-6 py-3 bg-gray-50 border-t border-gray-200',
        className
      )}
    >
      {children}
    </div>
  );
};