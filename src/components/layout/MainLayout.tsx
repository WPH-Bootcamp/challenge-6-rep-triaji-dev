import React, { type ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from '../ui/Toaster';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <div className='min-h-screen flex flex-col bg-black'>
      <Navbar addClass='sticky top-0 z-50 fixed' />
      <main className='grow -mt-22.5'>{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};
