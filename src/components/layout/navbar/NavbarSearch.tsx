import React, { useRef, useEffect } from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

interface NavbarSearchProps {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const NavbarSearch: React.FC<NavbarSearchProps> = ({
  searchOpen,
  setSearchOpen,
  searchValue,
  setSearchValue,
  onSearch,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
      setSearchValue('');
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
        searchInputRef.current.focus();
      }
      if (mobileInputRef.current) {
          mobileInputRef.current.value = '';
          mobileInputRef.current.focus();
      }
  };

  return (
    <>
      {/* Desktop Search */}
      <form
        onSubmit={onSearch}
        className='relative max-w-60 flex items-center justify-end backdrop-blur-lg rounded-2xl'
      >
        <Search className='absolute left-4 w-5 h-5 text-neutral-500 hidden md:block' />
        <Input
          name='search'
          placeholder='Search Movie'
          className='hidden md:block pl-12 w-full py-2 px-4 rounded-2xl border border-neutral-800 bg-neutral-950/60 focus:outline-none text-neutral-500 h-14 placeholder:text-sm md:placeholder:text-md'
          value={searchValue}
          onChange={handleInputChange}
          ref={searchInputRef}
        />
        {searchValue && (
          <Button
            variant='icon'
            className='absolute right-4 focus:outline-none hidden md:flex rounded-full bg-neutral-700 p-1'
            onClick={handleClear}
            type='button'
            tabIndex={-1}
            aria-label='Clear search input'
          >
            <X className='h-2.5 w-2.5 text-black' />
          </Button>
        )}
      </form>

      {/* Mobile Expandable Search */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 flex items-center transition-all duration-300 overflow-hidden px-4 ${
          searchOpen ? 'w-full opacity-100 z-50' : 'w-0 opacity-0'
        }`}
      >
        <form onSubmit={onSearch} className='relative flex-1 flex items-center h-full gap-3'>
          <Button
            variant='icon'
            className='focus:outline-none'
            onClick={() => {
              setSearchOpen(false);
              setSearchValue('');
            }}
            type='button'
          >
            <ArrowLeft className='h-5 w-5 opacity-70' />
          </Button>
          <Search className='absolute left-12 w-5 h-5 text-neutral-500 z-50' />
          <Input
            name='search'
            placeholder='Search Movie'
            className='w-full h-full pl-10 pr-10 rounded-lg bg-neutral-950/60 border border-neutral-800 backdrop-blur-lg text-sm focus:outline-none focus:ring-inset placeholder:text-neutral-400'
            value={searchValue}
            onChange={handleInputChange}
            ref={mobileInputRef}
            autoComplete='off'
          />

          {searchValue && (
            <Button
              variant='icon'
              className='absolute right-1 top-1/2 transform -translate-y-1/2 focus:outline-none rounded-full bg-neutral-700 mr-2 p-1'
              onClick={handleClear}
              type='button'
            >
              <X className='h-2.5 w-2.5 text-black' />
            </Button>
          )}

        </form>
      </div>
    </>
  );
};

export default NavbarSearch;
