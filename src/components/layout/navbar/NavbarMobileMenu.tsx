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
      className={`fixed inset-0 z-50 bg-black text-white flex flex-col px-4 sm:px-15 lg:px-25 xl:px-35 md:py-8 transition-opacity duration-300 ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className='flex-between mb-8 md:mb-12 h-16'>
        <div className='flex items-center space-x-2'>
            <NavbarLogo 
                className="hover:opacity-100" 
                onClick={(e) => {
                    setMenuOpen(false);
                    onNavClick(e, '/');
                }}
                isMobileEmbed
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
      <nav className='flex flex-col gap-8 text-md'>
        <a
          href='/'
          onClick={(e) => onNavClick(e, '/')}
        >
          Home
        </a>
        <a
          href='/favorites'
          onClick={(e) => onNavClick(e, '/favorites')}
        >
          Favorites
        </a>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
