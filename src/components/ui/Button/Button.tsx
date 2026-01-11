import React from 'react';
import type { ButtonProps } from './Button.interface';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  icon,
  ...props
}) => {
  const baseClasses =
    'px-6 py-2 rounded-full text-md font-semibold transition-colors h-13 w-57.5 cursor-pointer';
  const variantClasses = {
    primary: 'bg-primary-300 hover:bg-primary-400',
    secondary:
      'bg-neutral-950 hover:bg-neutral-900 border-1 border-neutral-800',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className} flex items-center justify-center gap-2`}
      {...props}
    >
      {children}
      {icon && <span className='flex items-center'>{icon}</span>}
    </button>
  );
};

export default Button;
