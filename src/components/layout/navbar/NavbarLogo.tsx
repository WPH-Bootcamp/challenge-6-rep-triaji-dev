import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarLogoProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isMobileEmbed?: boolean;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ className = '', onClick, isMobileEmbed = false }) => {
  return (
    <Link
      to='/'
      className={`flex space-x-2 items-center hover:opacity-80 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      <img
        src='/icons/logo-navbar.svg'
        alt='logo'
        className={isMobileEmbed ? 'h-6 md:h-9 md:scale-110' : 'h-7 md:h-10'}
      />
      <div className='text-xl md:text-display-md font-semibold'>
        Movie
      </div>
    </Link>
  );
};

export default NavbarLogo;
