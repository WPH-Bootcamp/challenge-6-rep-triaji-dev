import React from 'react';
import type { InputProps } from './Input.interface';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full py-2 px-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
