import React from 'react';
import Link from 'next/link';

const AdminSidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-white shadow-lg'>
      <nav className='p-4'>
        <ul className='space-y-4'>
          <li>
            <Link href='/admin/categories'>
              <a className='text-blue-600 hover:underline'>Категории</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/banner'>
              <a className='text-blue-600 hover:underline'>Баннер</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/documents'>
              <a className='text-blue-600 hover:underline'>Документы</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/users'>
              <a className='text-blue-600 hover:underline'>Пользователи</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/products'>
              <a className='text-blue-600 hover:underline'>Продукты</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/orders'>
              <a className='text-blue-600 hover:underline'>Заказы</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/blog'>
              <a className='text-blue-600 hover:underline'>Блог</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/shop-info'>
              <a className='text-blue-600 hover:underline'>Инфо о магазине</a>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
