import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { LucideIcon } from 'lucide-react';
import { GlobalProvider } from '../providers/GlobalProvider';
import '../styles/globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VisionExtract - Transform Screenshots into Structured Data',
  description: 'VisionExtract is an app that converts screenshots into structured data using advanced image processing and machine learning.',
  keywords: ['VisionExtract', 'image processing', 'machine learning', 'data extraction'],
  author: 'VisionExtract Team',
  viewport: 'width=device-width, initial-scale=1',
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <GlobalProvider>
          <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <LucideIcon name="camera" className="w-6 h-6 mr-2" />
              <span className="text-xl font-bold">VisionExtract</span>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/features" className="hover:underline">Features</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </nav>
          </header>
          <main className="p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2023 VisionExtract. All rights reserved.</p>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
};

export default Layout;