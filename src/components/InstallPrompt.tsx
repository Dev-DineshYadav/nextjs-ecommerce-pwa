import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptProps {
  appName?: string;
  description?: string;
  icon?: string;
  screenshots?: string[];
}

export default function InstallPrompt({
  appName = 'E-commerce PWA',
  description = 'Install our app for a better experience',
  icon = '/icons/icon-512.png',
  screenshots = ['/screenshots/desktop.png', '/screenshots/mobile.png'],
}: InstallPromptProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isIconLoading, setIsIconLoading] = useState(true);
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(true);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstallable(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstallable(false);
      }
    } catch (error) {
      console.error('Error installing app:', error);
    }
  };

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 bg-gray-100 rounded-lg">
            {isIconLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image 
              src={icon} 
              alt={`${appName} icon`} 
              fill
              sizes="48px"
              quality={75}
              priority={true}
              onLoad={() => setIsIconLoading(false)}
              className={`rounded-lg object-cover transition-opacity duration-300
                ${isIconLoading ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{appName}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <button
          onClick={() => setIsInstallable(false)}
          className="ml-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="mt-4 relative h-48 bg-gray-100 rounded-lg">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentScreenshot ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {isScreenshotLoading && index === currentScreenshot && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={screenshot}
              alt={`${appName} screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              quality={75}
              priority={index === 0}
              onLoad={() => {
                if (index === currentScreenshot) {
                  setIsScreenshotLoading(false);
                }
              }}
              className={`rounded-lg object-cover transition-opacity duration-300
                ${index === currentScreenshot && isScreenshotLoading ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        ))}
        {screenshots.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-10">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentScreenshot(index);
                  setIsScreenshotLoading(true);
                }}
                className={`w-2 h-2 rounded-full ${
                  index === currentScreenshot ? 'bg-white' : 'bg-white/50'
                }`}
              >
                <span className="sr-only">Screenshot {index + 1}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleInstallClick}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Install Now
      </button>
    </div>
  );
}