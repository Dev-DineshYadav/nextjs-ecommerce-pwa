import type { AppProps } from 'next/app';
import InstallPrompt from '../components/InstallPrompt';
import { CartProvider } from '@/contexts/CartContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CartProvider>
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