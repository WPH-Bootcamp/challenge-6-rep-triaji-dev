import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className='bg-base-black text-white py-8 border-t border-neutral-900 mt-4  '>
      <div className=' mx-auto  px-4 sm:px-15 lg:px-25 xl:px-35  '>
        <div className='flex flex-col md:flex-row justify-between '>
          <Link
            to='/'
            className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              } else {
                e.preventDefault();
                navigate('/');
              }
            }}
          >
            <img
              src='/logo-navbar.svg'
              alt='logo'
              className='h-9 md:scale-110'
            />
            <div className='text-[24px] md:text-[30px] font-semibold'>
              Movie
            </div>
          </Link>
          <div className='mt-4 md:mt-0 text-sm text-neutral-600'>
            Copyright ©2025 Movie Explorer
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
