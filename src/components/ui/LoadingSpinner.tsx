import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = 'h-screen' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className='animate-spin rounded-full h-12 w-12 border-4 border-neutral-700 border-t-primary-300' />
    </div>
  );
};

export default LoadingSpinner;
