import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className='bg-base-black border-t border-neutral-900 text-white'>
      <div className='layout-px mx-auto pt-6 pb-8 md:py-10'>
        <div className='flex flex-col gap-2 justify-between md:flex-row'>
          <Link
            to='/'
            className='flex items-center space-x-2 transition-opacity hover:opacity-80'
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
              src='/icons/logo-navbar.svg'
              alt='logo'
              className='h-7 md:scale-105'
            />
            <div className='md:text-display-sm text-lg font-semibold'>
              Movie
            </div>
          </Link>
          <div className='flex-start text-xs text-neutral-600 md:mt-0 md:text-md'>
            Copyright ©2025 Movie Explorer
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
