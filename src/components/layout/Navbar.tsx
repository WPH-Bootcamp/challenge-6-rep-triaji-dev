import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Search, X, Menu, ArrowRight } from 'lucide-react';
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
            <Link
              to='/'
              className={`flex space-x-2 items-center hover:opacity-80 transition-all duration-300 ${
                searchOpen ? 'opacity-0 invisible md:opacity-100 md:visible' : 'opacity-100 visible'
              }`}
              onClick={(e) => handleNavClick(e, '/')}
            >
              <img
                src='/icons/logo-navbar.svg'
                alt='logo'
                className='h-7 md:h-10'
              />
              <div className='text-xl md:text-display-md font-semibold'>
                Movie
              </div>
            </Link>
            <div className='text-md hidden md:flex gap-12 text-shadow-lg'>
              <a
                href='/'
                className='hover:text-neutral-400 transition-colors p-2'
                onClick={(e) => handleNavClick(e, '/')}
              >
                Home
              </a>
              <a
                href='/favorites'
                className='hover:text-neutral-400 transition-colors p-2'
                onClick={(e) => handleNavClick(e, '/favorites')}
              >
                Favorites
              </a>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <form
              onSubmit={handleSearch}
              className='relative max-w-60 flex items-center justify-end backdrop-blur-lg rounded-2xl'
            >
              <Search className='absolute left-4 w-5 h-5 text-neutral-500 hidden md:block' />
              <Input
                name='search'
                placeholder='Search Movie'
                className='hidden md:block pl-12 w-full py-2 px-4 rounded-2xl border border-neutral-800 bg-neutral-950/60  focus:outline-none text-neutral-500 h-14 placeholder:text-sm md:placeholder:text-md'
                value={searchValue}
                onChange={handleInputChange}
                ref={searchInputRef}
              />
              {searchValue && (
                <Button
                  variant='icon'
                  className='absolute right-4 focus:outline-none hidden md:flex rounded-full bg-neutral-700/60'
                  onClick={handleClear}
                  type='button'
                  tabIndex={-1}
                  aria-label='Clear search input'
                >
                  <X className='h-3 w-3 opacity-25' />
                </Button>
              )}
            </form>
            <div
              className={`absolute top-1/2 -translate-y-1/2 right-10 h-11 flex items-center transition-all duration-300 overflow-hidden ${
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
                    className='absolute right-8 top-1/2 transform -translate-y-1/2 focus:outline-none rounded-full bg-neutral-700/60 mr-2'
                    onClick={handleClear}
                    type='button'
                  >
                    <X className='h-3 w-3 opacity-50' />
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
                  <ArrowRight className='h-5 w-5 opacity-70' />
                </Button>
              </form>
            </div>

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
                className='focus:outline-none'
                aria-label='Open menu'
                onClick={() => setMenuOpen(true)}
              >
                <Menu className='h-6 w-6' />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-50 bg-black text-white flex flex-col px-4 sm:px-15 lg:px-25 xl:px-35 md:py-8 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className='flex-between mb-8 md:mb-12 h-16'>
          <div className='flex items-center space-x-2'>
            <img
              src='/icons/logo-navbar.svg'
              alt='logo'
              className='h-6 md:h-9 md:scale-110'
            />
            <span className='text-xl md:text-display-md font-semibold'>Movie</span>
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
            onClick={(e) => handleNavClick(e, '/')}
          >
            Home
          </a>
          <a
            href='/favorites'
            onClick={(e) => handleNavClick(e, '/favorites')}
          >
            Favorites
          </a>
        </nav>
      </div>

    </>
  );
};

export default Navbar;

