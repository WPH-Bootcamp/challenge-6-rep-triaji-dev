import React, { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';

interface NavbarProps {
  addClass?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <nav
        className={`${
          isScrolled ? 'bg-neutral-950/60 backdrop-blur-lg' : 'bg-transparent'
        } text-neutral-25 py-4 px-4 sm:px-15 lg:px-25 xl:px-35  sticky top-0 z-50 h-22.5 flex items-center transition-all duration-300`}
      >
        <div className=' flex items-center justify-between w-full'>
          <div className='flex items-center space-x-20'>
            <Link
              to='/'
              className='flex space-x-2 items-center hover:opacity-80 transition-opacity'
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
            <div className='text-md hidden md:flex space-x-12 text-shadow-lg'>
              <a
                href='/'
                className='hover:text-neutral-400 transition-colors'
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
                Home
              </a>
              <a
                href='#'
                className='hover:text-neutral-400 transition-colors'
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/favorites');
                }}
              >
                Favorites
              </a>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <form
              onSubmit={handleSearch}
              className='relative max-w-60 flex items-center justify-end '
            >
              <img
                src='/icon-search.svg'
                alt='search'
                className='absolute left-4'
              />
              <Input
                name='search'
                placeholder='Search Movie'
                className='hidden md:block pl-12 w-full py-2 px-4 rounded-md bg-neutral-800/50  focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-500 h-14 '
                value={searchValue}
                onChange={handleInputChange}
                ref={searchInputRef}
              />
              {searchValue && (
                <button
                  type='button'
                  className='absolute right-4'
                  onClick={handleClear}
                  tabIndex={-1}
                  aria-label='Clear search input'
                >
                  <img
                    src='/icon-search-clear.svg'
                    alt='Clear'
                    className='h-5 w-5 opacity-25 cursor-pointer'
                  />
                </button>
              )}
            </form>
            <button
              className={`md:hidden ml-2 focus:outline-none ${
                searchOpen ? 'bg-neutral-800/80 rounded-full' : ''
              }`}
              aria-label='Open search'
              onClick={() => setSearchOpen(true)}
              type='button'
            >
              <img
                src='/icon-search.svg'
                alt='Open search'
                className='h-6 w-6 mr-4'
              />
            </button>
            <button
              className='md:hidden focus:outline-none'
              aria-label='Open menu'
              onClick={() => setMenuOpen(true)}
              type='button'
            >
              <img
                src='/icon-hamburger.svg'
                alt='Open menu'
                className='h-6 w-6'
              />
            </button>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className='fixed inset-0 z-50  bg-black/70 backdrop-blur-2xl text-white flex flex-col px-4 sm:px-15 lg:px-25 xl:px-35 py-8'>
          <div className='flex items-center justify-between mb-12'>
            <div className='flex items-center space-x-2'>
              <img
                src='/logo-navbar.svg'
                alt='logo'
                className='h-9 md:scale-110'
              />
              <span className='text-[24px] md:text-[30px] font-semibold'>
                Movie
              </span>
            </div>
            <button
              className='focus:outline-none'
              aria-label='Close menu'
              onClick={() => setMenuOpen(false)}
              type='button'
            >
              <img src='/icon-close.svg' alt='Close menu' className='h-5 w-5' />
            </button>
          </div>
          <nav className='flex flex-col gap-8 text-xl'>
            <a
              href='/'
              onClick={(e) => {
                setMenuOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  e.preventDefault();
                  navigate('/');
                }
              }}
            >
              Home
            </a>
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                navigate('/favorites');
              }}
            >
              Favorites
            </a>
          </nav>
        </div>
      )}
      {searchOpen && (
        <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl text-white flex flex-col px-7 py-8'>
          <div className='flex items-center space-x-4'>
            <button
              className='focus:outline-none'
              aria-label='Back'
              onClick={() => setSearchOpen(false)}
              type='button'
            >
              <img src='/arrow-left.svg' alt='Back' className='h-6 w-6' />
            </button>
            <form onSubmit={handleSearch} className='relative flex-1'>
              <img
                src='/icon-search.svg'
                alt='search'
                className='absolute left-4 top-1/2 transform -translate-y-1/2'
              />
              <Input
                name='search'
                placeholder='Search Movie'
                className='w-full pl-12 py-2 px-4 rounded-md bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-500 h-14'
                value={searchValue}
                onChange={handleInputChange}
                ref={searchInputRef}
              />
              {searchValue && (
                <button
                  type='button'
                  className='absolute right-4 top-1/2 transform -translate-y-1/2'
                  onClick={handleClear}
                  tabIndex={-1}
                  aria-label='Clear search input'
                >
                  <img
                    src='/icon-search-clear.svg'
                    alt='Clear'
                    className='h-5 w-5 opacity-25 cursor-pointer'
                  />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
