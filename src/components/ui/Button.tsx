import { cn } from '../../lib/utils';
import React from 'react';
import type { ButtonProps } from './Button.interface';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  className = '',
  children,
  icon,
  ...props
}, ref) => {
  const baseClasses =
    'rounded-full font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-primary-300 hover:bg-primary-400 text-white px-6 py-2 h-11 lg:h-13 w-57.5 text-md',
    secondary:
      'bg-neutral-950 hover:bg-black border-1 border-neutral-800 px-6 py-2 h-11 lg:h-13 w-57.5 text-md',
    icon: 'p-2 bg-transparent hover:opacity-60 transition-opacity ',
  };

  return (
    <button
      ref={ref}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
      {icon && <span className='flex items-center'>{icon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
