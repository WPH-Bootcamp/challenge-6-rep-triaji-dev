import React from 'react';
import { X } from 'lucide-react';
import Button from '../../ui/Button';
import NavbarLogo from './NavbarLogo';

interface NavbarMobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({
  menuOpen,
  setMenuOpen,
  onNavClick,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-black px-4 text-white transition-opacity duration-300 sm:px-15 md:py-8 lg:px-25 xl:px-35 ${
        menuOpen
          ? 'visible opacity-100'
          : 'pointer-events-none invisible opacity-0'
      }`}
    >
      <div className='flex-between mb-6 h-16 md:mb-12'>
        <div className='flex items-center space-x-2'>
          <NavbarLogo
            className='hover:opacity-100'
            onClick={(e) => {
              setMenuOpen(false);
              onNavClick(e, '/');
            }}
          />
        </div>
        <Button
          variant='icon'
          className='focus:outline-none'
          aria-label='Close menu'
          onClick={() => setMenuOpen(false)}
        >
          <X className='h-6 w-6' />
        </Button>
      </div>
      <nav className='text-md flex flex-col gap-8'>
        <a href='/' onClick={(e) => onNavClick(e, '/')}>
          Home
        </a>
        <a href='/favorites' onClick={(e) => onNavClick(e, '/favorites')}>
          Favorites
        </a>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
