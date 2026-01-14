import React from 'react';
import { IoPlayCircle } from 'react-icons/io5';
import Button from './Button';

interface TrailerButtonProps {
  isLoading: boolean;
  hasTrailer: boolean;
  onClick: () => void;
  className?: string;
}

const TrailerButton: React.FC<TrailerButtonProps> = ({
  isLoading,
  hasTrailer,
  onClick,
  className = '',
}) => {
  if (isLoading) {
    return (
      <Button
        variant='secondary'
        className={`opacity-50 cursor-not-allowed text-white ${className}`}
        disabled
        icon={<IoPlayCircle size={22} />}
      >
        Loading...
      </Button>
    );
  }

  if (!hasTrailer) {
    return (
      <Button
        variant='secondary'
        className={`opacity-50 cursor-not-allowed bg-neutral-700 text-neutral-400 ${className}`}
        disabled
        icon={<IoPlayCircle size={22} />}
      >
        No Trailer
      </Button>
    );
  }

  return (
    <Button
      variant='primary'
      onClick={onClick}
      className={`text-white ${className}`}
      icon={<IoPlayCircle size={22} />}
    >
      Watch Trailer
    </Button>
  );
};

export default TrailerButton;
