import React from 'react';
import type { InputProps } from './types/Input.interface';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full py-2 px-4 bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-red-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
