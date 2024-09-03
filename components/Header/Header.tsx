'use client'; // Необходим для компонентов, которые используют интерактивные элементы

import {useEffect} from 'react';
import Link from 'next/link';
import {Menu, ShoppingCart, UserCircle} from 'lucide-react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {useQuery} from 'react-query';
import {GetUser} from '@/data/api/user';
import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {Button} from '../ui/button';

export const Header = () => {
  const token = getCookie('token');

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
        {/* <Link href='/contacts' className='opacity-70 hover:opacity-90'>
          Контакты
        </Link> */}
        <Link href='/blog' className='opacity-70 hover:opacity-90'>
          Блог
        </Link>
      </nav>

      {/* Иконки справа */}
      <div className='flex items-center space-x-4'>
        {' '}
        {token ? (
          <Link href='/profile' className='opacity-70 hover:opacity-90'>
            <UserCircle size={24} />
          </Link>
        ) : (
          <Link href='/login'>
            <Button>Войти</Button>
          </Link>
        )}
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
              <Link href='/blog' className='text-lg opacity-70 hover:opacity-90'>
                Блог
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
