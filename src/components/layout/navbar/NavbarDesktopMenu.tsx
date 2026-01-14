import React from 'react';

interface NavbarDesktopMenuProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const NavbarDesktopMenu: React.FC<NavbarDesktopMenuProps> = ({ onNavClick }) => {
  return (
    <div className='text-md hidden md:flex gap-12 text-shadow-lg'>
      <a
        href='/'
        className='hover:text-neutral-400 transition-colors p-2'
        onClick={(e) => onNavClick(e, '/')}
      >
        Home
      </a>
      <a
        href='/favorites'
        className='hover:text-neutral-400 transition-colors p-2'
        onClick={(e) => onNavClick(e, '/favorites')}
      >
        Favorites
      </a>
    </div>
  );
};

export default NavbarDesktopMenu;
