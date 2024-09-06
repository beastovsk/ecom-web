import {Footer} from '@/components/Footer/Footer';
import {Header} from '@/components/Header/Header';
import {AdminLayout} from '@/modules/admin/AdminLayout/AdminLayout';
import AdminSidebar from '@/modules/admin/AdminSidebar/AdminSidebar';
import React from 'react';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <AdminLayout>
      <div className='flex min-h-screen'>
        <AdminSidebar />
        <main className='flex-1 p-6'>{children}</main>
      </div>
    </AdminLayout>
  );
}
