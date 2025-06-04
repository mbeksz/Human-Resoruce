import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, icon, fullWidth = false, className, ...props }, ref) => {
    return (
      <div className={twMerge(fullWidth ? 'w-full' : '', className)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={twMerge(
              'block px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 w-full',
              error
                ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500',
              icon ? 'pl-10' : '',
              props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;