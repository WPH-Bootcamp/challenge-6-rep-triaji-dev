import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarDesktopMenu from './navbar/NavbarDesktopMenu';
import NavbarSearch from './navbar/NavbarSearch';
import NavbarMobileActions from './navbar/NavbarMobileActions';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';

interface NavbarProps {
  addClass?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;

    if (query.trim()) {
      setSearchOpen(false);
      setSearchValue('');
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      navigate(path);
    }
  };

  return (
    <>
      <header
        className={`${
          isScrolled ? 'bg-neutral-950/60 backdrop-blur-lg' : 'bg-transparent'
        } text-neutral-25 py-3 md:py-4 layout-px sticky top-0 z-50 h-16 md:h-22.5 flex items-center transition-all duration-300`}
      >
        <div className=' flex-between w-full'>
          <div className='flex items-center gap-16'>
            <NavbarLogo 
                onClick={(e) => handleNavClick(e, '/')} 
                className={searchOpen ? 'opacity-0 invisible md:opacity-100 md:visible' : 'opacity-100 visible'}
            />
            <NavbarDesktopMenu onNavClick={handleNavClick} />
          </div>
          <div className='flex items-center gap-2'>
            <NavbarSearch
                searchOpen={searchOpen}
                setSearchOpen={setSearchOpen}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onSearch={handleSearch}
            />
            <NavbarMobileActions 
                searchOpen={searchOpen} 
                setSearchOpen={setSearchOpen} 
                setMenuOpen={setMenuOpen} 
            />
          </div>
        </div>
      </header>
      <NavbarMobileMenu 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        onNavClick={handleNavClick} 
      />
    </>
  );
};

export default Navbar;

