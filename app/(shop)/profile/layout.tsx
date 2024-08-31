import {Footer} from '@/components/Footer/Footer';
import {Header} from '@/components/Header/Header';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <div>{children}</div>;
}
