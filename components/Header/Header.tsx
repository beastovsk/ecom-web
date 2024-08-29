'use client'; // Необходим для компонентов, которые используют интерактивные элементы

import * as React from 'react';
import Link from 'next/link';
import {Menu, Search, ShoppingCart, Icon, UserCircle} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

export const Header = () => {
  return (
    <header className='flex items-center justify-between p-4 shadow-sm'>
      {/* Лого */}
      <div className='flex items-center space-x-2'>
        {/* Абстрактный логотип */}
        <span className='font-bold text-lg'>Лого</span>
      </div>

      {/* Навигация */}
      <nav className='hidden md:flex space-x-8'>
        <Link href='/' className='opacity-70 hover:opacity-90'>
          Главная
        </Link>
        <Link href='/products' className='opacity-70 hover:opacity-90'>
          Продукты
        </Link>
        <Link href='/contacts' className='opacity-70 hover:opacity-90'>
          Контакты
        </Link>
      </nav>

      {/* Иконки справа */}
      <div className='flex items-center space-x-4'>
        <UserCircle size={24} className='opacity-70 hover:opacity-90 cursor-pointer' />
        <Link href='/cart' className='opacity-70 hover:opacity-90'>
          <ShoppingCart size={24} />
        </Link>
        {/* Бургер-меню для мобильных устройств */}
        <Sheet>
          <SheetTrigger className='md:hidden'>
            <Menu size={24} className='opacity-70 hover:opacity-90' />
          </SheetTrigger>
          <SheetContent className=''>
            <nav className='flex flex-col space-y-4'>
              <Link href='/' className='text-lg opacity-70 hover:opacity-90'>
                Главная
              </Link>
              <Link href='/products' className='text-lg opacity-70 hover:opacity-90'>
                Продукты
              </Link>
              <Link href='/contacts' className='text-lg opacity-70 hover:opacity-90'>
                Контакты
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
