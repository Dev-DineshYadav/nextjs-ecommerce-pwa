import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import InstallPrompt from '../components/InstallPrompt';
import { CartProvider } from '@/contexts/CartContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOnline(navigator.onLine);

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/worker.js');
          console.log('ServiceWorker registration successful with scope:', registration.scope);
        } catch (error) {
          console.error('ServiceWorker registration failed:', error);
        }
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <CartProvider>
      {!isOnline && (
        <div className="sticky top-0 bg-blue-500 text-white text-center py-2 z-50">
          You are currently offline. Some features may be limited.
        </div>
      )}
      <Component {...pageProps} />
      <InstallPrompt
        appName='E-commerce PWA'
        description='Install our app for a better experience'
        icon='/icons/icon-512.png'
        screenshots={['/screenshots/desktop.png', '/screenshots/mobile.png']}
      />
    </CartProvider>
  );
}