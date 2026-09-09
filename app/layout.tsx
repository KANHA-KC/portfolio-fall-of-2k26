import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { ToastProvider } from '@/components/Toast';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
});

const instagramSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instagram-sans',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Studio — Designer, Writer, Product Thinker',
  description: 'I turn complex ideas into simple, intuitive experiences.',
  keywords: [
    'UI/UX Design',
    'Product Design',
    'AI Interaction Design',
    'Systems Architecture',
    'Design Engineering',
  ],
  authors: [{ name: 'Studio' }],
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#f4efe6',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="paper"
      className={`${fraunces.variable} ${inter.variable} ${instagramSans.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ToastProvider>
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
