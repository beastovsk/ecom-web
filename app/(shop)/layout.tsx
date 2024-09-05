// app/layout.tsx
import {Footer} from '@/components/Footer/Footer';
import {Header} from '@/components/Header/Header';
import React from 'react';
import {Metadata} from 'next';

// Асинхронная функция для получения метаданных
export async function generateMetadata(): Promise<Metadata> {
  // Fetch данных с бэкенда
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getMain`);
  const data = await response.json();
  const shop = data.main[0];
  const parsedLogo = JSON.parse(JSON.parse(shop.logo));

  return {
    title: {
      default: shop.name || 'Shop',
      template: `%s | ${shop.name}`
    },
    description: shop.description || 'Онлайн-магазин',
    keywords: shop.seo_tags ? shop.seo_tags.split(',') : [] || [],
    robots: {
      index: true,
      follow: true
    },
    icons: {
      icon: parsedLogo || '/favicon.ico'
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false
    }
  };
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getMain`);
  const data = await response.json();
  const shop = data.main[0];

  return (
    <div className='flex min-h-screen flex-col'>
      <Header shop={shop} />
      <main className='flex-grow'>{children}</main>
      <Footer shop={shop} />
    </div>
  );
}
