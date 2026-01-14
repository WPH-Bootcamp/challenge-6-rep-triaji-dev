import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full py-2 px-4 bg-gray-700 text-white focus:outline-none focus:border focus:border-primary-400 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
