import './globals.css';
import './variables.css';
import '../styles/components.css';
import '../styles/notification.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'EB Install | Equipment Rental',
  description: 'Professional equipment rental with same-day delivery',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
