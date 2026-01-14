import React from 'react';
import { TriangleAlert, RefreshCw } from 'lucide-react';
import Button from './Button';
import { cn } from '../../lib/utils';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = 'Something went wrong. Please try again.', 
  onRetry,
  className 
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center min-h-[50vh] p-8 text-center", className)}>
      <div className="bg-neutral-800/50 p-4 rounded-full mb-4">
        <TriangleAlert className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-display-xs font-semibold text-white mb-2">Oops! Error Occurred</h3>
      <p className="text-neutral-400 max-w-md mb-6">{message}</p>
      
      {onRetry && (
        <Button 
          variant="primary" 
          onClick={onRetry}
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
