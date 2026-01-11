import React from 'react';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = 'h-screen' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary' />
    </div>
  );
};

export default LoadingSpinner;
