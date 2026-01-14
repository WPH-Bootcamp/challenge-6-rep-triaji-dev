import React from 'react';
import { Search, Menu } from 'lucide-react';
import Button from '../../ui/Button';

interface NavbarMobileActionsProps {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
}

const NavbarMobileActions: React.FC<NavbarMobileActionsProps> = ({
  searchOpen,
  setSearchOpen,
  setMenuOpen,
}) => {
  return (
    <div className='md:hidden flex items-center space-x-6'>
      <Button
        variant='icon'
        className={`ml-2 focus:outline-none transition-opacity duration-300 ${
          searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label='Open search'
        onClick={() => setSearchOpen(true)}
      >
        <Search className='h-6 w-6' />
      </Button>
      <Button
        variant='icon'
        className={`focus:outline-none ${
          searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label='Open menu'
        onClick={() => setMenuOpen(true)}
      >
        <Menu className='h-6 w-6' />
      </Button>
    </div>
  );
};

export default NavbarMobileActions;
