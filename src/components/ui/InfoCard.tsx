import React from 'react';

interface InfoCardProps {
  icon: string;
  label: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => {
  return (
    <div className='flex flex-col items-center justify-between rounded-2xl border border-neutral-900 bg-black/80 p-4 shadow-md sm:p-5 gap-2'>
      <img src={icon} alt={label} className='h-6 w-6 sm:h-8 sm:w-8' />
      <div className='flex-center flex-col'>
        <div className='sm:text-md text-xs text-neutral-300'>{label}</div>
        <div className='text-center text-lg font-semibold sm:text-xl line-clamp-1'>{value}</div>
      </div>
    </div>
  );
};

export default InfoCard;
