import {Footer} from '@/components/Footer/Footer';
import {Header} from '@/components/Header/Header';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
}
