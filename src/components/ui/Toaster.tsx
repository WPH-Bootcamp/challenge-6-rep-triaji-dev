import { Toaster as SonnerToaster } from 'sonner';

export const Toaster = () => {
  return (
    <SonnerToaster
      position='top-center'
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'flex justify-center w-full !bg-transparent !shadow-none !border-none !p-0',
        },
      }}
    />
  );
};

export default Toaster;
