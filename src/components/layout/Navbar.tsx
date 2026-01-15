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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
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
        } text-neutral-25 layout-px sticky top-0 z-50 flex h-16 items-center py-3 transition-all duration-300 md:h-22.5 md:py-4`}
      >
        <div className='flex-between w-full'>
          <div className='flex items-center gap-16'>
            <NavbarLogo
              onClick={(e) => handleNavClick(e, '/')}
              className={
                searchOpen
                  ? 'invisible opacity-0 md:visible md:opacity-100'
                  : 'visible opacity-100'
              }
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
        <NavbarMobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onNavClick={handleNavClick}
        />
      </header>
    </>
  );
};

export default Navbar;
