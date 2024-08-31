import React from 'react';
import Link from 'next/link';
import s from './AdminSidebar.module.scss';

const AdminSidebar: React.FC = () => {
  return (
    <aside className='w-64 shadow-lg'>
      <nav className='p-4'>
        <h2 className='text-xl font-semibold mb-5'>Админ панель</h2>
        <div className='flex flex-col gap-5 ml-2'>
          <Link href='/admin/categories' className={s.link}>
            Категории
          </Link>
          <Link href='/admin/banner' className={s.link}>
            Баннер
          </Link>
          <Link href='/admin/documents' className={s.link}>
            Документы
          </Link>

          <Link href='/admin/users' className={s.link}>
            Пользователи
          </Link>

          <Link href='/admin/products' className={s.link}>
            Продукты
          </Link>

          <Link href='/admin/orders' className={s.link}>
            Заказы
          </Link>

          <Link href='/admin/blog' className={s.link}>
            Блог
          </Link>

          <Link href='/admin/shop-info' className={s.link}>
            Инфо о магазине
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
