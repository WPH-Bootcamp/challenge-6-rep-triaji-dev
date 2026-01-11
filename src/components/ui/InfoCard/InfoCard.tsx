import React from 'react';

interface InfoCardProps {
  icon: string;
  label: string;
  value: string | number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => {
  return (
    <div className='bg-black/80 border border-neutral-900 rounded-2xl p-6 flex flex-col items-center shadow-md'>
      <img src={icon} alt={label} className='w-6 h-6 sm:w-8 sm:h-8' />
      <div className='text-neutral-300 text-md sm:text-lg mt-4'>{label}</div>
      <div className='text-md sm:text-xl font-semibold mt-4 text-center'>
        {value}
      </div>
    </div>
  );
};

export default InfoCard;
