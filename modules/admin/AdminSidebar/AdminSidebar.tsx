'use client';

import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation'; // Импорт usePathname
import s from './AdminSidebar.module.scss';

const AdminSidebar: React.FC = () => {
  const pathname = usePathname(); // Получение текущего пути
  console.log(pathname.slice(-1));
  // Функция для проверки, является ли ссылка активной
  const isActiveLink = (href: string) => pathname === href;

  return (
    <aside className='w-64 shadow-lg'>
      <nav className='p-4'>
        <h2 className='text-xl font-semibold mb-5'>Админ панель</h2>
        <div className='flex flex-col gap-5 ml-2'>
          <Link href='/admin' className={isActiveLink('/admin/') ? `${s.link} ${s.active}` : s.link}>
            Главная
          </Link>
          <Link
            href='/admin/categories'
            className={isActiveLink('/admin/categories/') ? `${s.link} ${s.active}` : s.link}
          >
            Категории
          </Link>
          <Link href='/admin/banner' className={isActiveLink('/admin/banner/') ? `${s.link} ${s.active}` : s.link}>
            Баннер
          </Link>
          <Link href='/admin/documents' className={isActiveLink('/admin/documents/') ? `${s.link} ${s.active}` : s.link}>
            Документы
          </Link>
          <Link href='/admin/users' className={isActiveLink('/admin/users/') ? `${s.link} ${s.active}` : s.link}>
            Пользователи
          </Link>
          <Link href='/admin/products' className={isActiveLink('/admin/products/') ? `${s.link} ${s.active}` : s.link}>
            Продукты
          </Link>
          <Link href='/admin/orders' className={isActiveLink('/admin/orders/') ? `${s.link} ${s.active}` : s.link}>
            Заказы
          </Link>
          <Link href='/admin/blog' className={isActiveLink('/admin/blog/') ? `${s.link} ${s.active}` : s.link}>
            Блог
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
