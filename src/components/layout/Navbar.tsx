import React, { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

interface NavbarProps {
  addClass?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
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
        } text-neutral-25 py-3 md:py-4 px-4 sm:px-15 lg:px-25 xl:px-35 sticky top-0 z-50 h-16 md:h-22.5 flex items-center transition-all duration-300`}
      >
        <div className=' flex items-center justify-between w-full'>
          <div className='flex items-center space-x-20'>
            <Link
              to='/'
              className={`flex space-x-2 items-center hover:opacity-80 transition-all duration-300 ${
                searchOpen ? 'opacity-0 invisible md:opacity-100 md:visible' : 'opacity-100 visible'
              }`}
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
                className='h-6 md:h-9 md:scale-110'
              />
              <div className='text-xl md:text-[30px] font-semibold'>
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
              className='relative max-w-60 flex items-center justify-end backdrop-blur-lg rounded-md'
            >
              <img
                src='/icons/icon-search.svg'
                alt='search'
                className='absolute left-4'
              />
              <Input
                name='search'
                placeholder='Search Movie'
                className='hidden md:block pl-12 w-full py-2 px-4 rounded-md bg-neutral-800/60  focus:outline-none focus:ring-2 focus:ring-neutral-300 text-neutral-500 h-14 placeholder:text-sm md:placeholder:text-base'
                value={searchValue}
                onChange={handleInputChange}
                ref={searchInputRef}
              />
              {searchValue && (
                <Button
                  variant='icon'
                  className='absolute right-4 focus:outline-none'
                  onClick={handleClear}
                  type='button'
                  tabIndex={-1}
                  aria-label='Clear search input'
                >
                  <img
                    src='/icons/icon-search-clear.svg'
                    alt='Clear'
                    className='h-5 w-5 opacity-25'
                  />
                </Button>
              )}
            </form>
            <div
              className={`absolute top-1/2 -translate-y-1/2 right-10 h-10 flex items-center transition-all duration-300 overflow-hidden ${
                searchOpen ? 'w-[calc(100%-4rem)] opacity-100 z-50' : 'w-0 opacity-0'
              }`}
            >
              <form onSubmit={handleSearch} className='flex-1 flex items-center h-full relative'>
                <Input
                  name='search'
                  placeholder='Search...'
                  className='w-full h-full pl-4 pr-10 rounded-lg bg-neutral-800/70 backdrop-blur-lg text-sm focus:outline-none focus:ring-inset placeholder:text-neutral-400'
                  value={searchValue}
                  onChange={handleInputChange}
                  ref={searchInputRef}
                  autoComplete='off'
                />
                 {searchValue && (
                  <Button
                    variant='icon'
                    className='absolute right-8 top-1/2 transform -translate-y-1/2 focus:outline-none'
                    onClick={handleClear}
                    type='button'
                  >
                    <img
                      src='/icons/icon-search-clear.svg'
                      alt='Clear'
                      className='h-4 w-4 opacity-50'
                    />
                  </Button>
                )}
                 <Button
                  variant='icon'
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none'
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchValue('');
                  }}
                  type='button'
                >
                  <img
                    src='/icons/icon-close.svg'
                    alt='Close'
                    className='h-3 w-3 opacity-70'
                  />
                </Button>
              </form>
            </div>

            <Button
              variant='icon'
              className={`md:hidden ml-2 focus:outline-none transition-opacity duration-300 ${
                searchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-label='Open search'
              onClick={() => setSearchOpen(true)}
            >
              <img
                src='/icons/icon-search.svg'
                alt='Open search'
                className='h-5 w-5 md:h-6 md:w-6'
              />
            </Button>
            <Button
              variant='icon'
              className='md:hidden focus:outline-none'
              aria-label='Open menu'
              onClick={() => setMenuOpen(true)}
            >
              <img
                src='/icons/icon-hamburger.svg'
                alt='Open menu'
                className='h-5 w-5 md:h-6 md:w-6'
              />
            </Button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-50 bg-black text-white flex flex-col px-4 sm:px-15 lg:px-25 xl:px-35 md:py-8 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className='flex items-center justify-between mb-8 md:mb-12 h-16'>
          <div className='flex items-center space-x-2'>
            <img
              src='/icons/logo-navbar.svg'
              alt='logo'
              className='h-6 md:h-9 md:scale-110'
            />
            <span className='text-xl md:text-[30px] font-semibold'>Movie</span>
          </div>
          <Button
            variant='icon'
            className='focus:outline-none'
            aria-label='Close menu'
            onClick={() => setMenuOpen(false)}
          >
            <img
              src='/icons/icon-close.svg'
              alt='Close menu'
              className='h-4 w-4 md:h-5 md:w-5'
            />
          </Button>
        </div>
        <nav className='flex flex-col gap-8 text-md'>
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

    </>
  );
};

export default Navbar;

