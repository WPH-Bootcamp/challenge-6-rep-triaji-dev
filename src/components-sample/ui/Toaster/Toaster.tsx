import { Toaster as HotToaster } from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';

export const Toaster = () => {
  return (
    <HotToaster
      position='top-center'
      toastOptions={{
        duration: 2000,
        className: '!px-0 !py-0',
        style: {
          maxWidth: '100%',
          width: 'auto',
          background: 'transparent',
          boxShadow: 'none',
        },
        success: {
          style: {
            background: 'transparent',
          },
          icon: null,
        },
      }}
    >
      {(t: Toast) => {
        const isMobile = window.innerWidth < 640;
        const width = isMobile ? 300 : 520;
        const isAdding =
          t.type === 'success' && t.message === 'Added to favorites';

        return (
          <div
            className={`
              ${t.visible ? 'animate-enter' : 'animate-leave'}
              max-w-[${width}px] w-full bg-black/60 backdrop-blur-md rounded-md
              flex items-center justify-center gap-3 px-4 py-3 shadow-lg
              border border-white/10 translate-y-30
            `}
            style={{
              width: width + 'px',
            }}
          >
            <img
              src={isAdding ? '/icon-check.svg' : '/icon-cross.svg'}
              alt={isAdding ? 'success' : 'remove'}
              className='w-6 h-6'
            />
            <p className='text-white text-sm font-medium text-center'>
              {isAdding
                ? 'Success Add to Favorites'
                : 'Success Remove from Favorites'}
            </p>
          </div>
        );
      }}
    </HotToaster>
  );
};

export default Toaster;
