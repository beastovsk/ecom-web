'use client'; // Необходим для компонентов, которые используют интерактивные элементы

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Menu, ShoppingCart, UserCircle} from 'lucide-react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {getCookie} from 'cookies-next';
import {Button} from '../ui/button';
import Image from 'next/image';

export const Header = ({shop}) => {
  const [token, setToken] = useState(null); // Используем состояние для токена

  useEffect(() => {
    // Получаем токен только на клиенте
    const userToken = getCookie('token');
    setToken(userToken);
  }, []); // Пустой массив зависимостей чтобы эффект выполнялся только один раз на монтирование компонента

  return (
    <header className='flex items-center justify-between p-4 shadow-sm'>
      {/* Лого */}
      <div className='flex items-center space-x-2'>
        {/* Проверяем, что логотип доступен перед рендерингом */}
        {shop.logo && <Image src={shop.logo} alt={shop.name} width={50} height={50} />}
        <span className='font-bold text-lg'>{shop.name}</span>
      </div>

      {/* Навигация */}
      <nav className='hidden md:flex space-x-8'>
        <Link href='/' className='opacity-70 hover:opacity-90'>
          Главная
        </Link>
        <Link href='/products' className='opacity-70 hover:opacity-90'>
          Продукты
        </Link>
        <Link href='/blog' className='opacity-70 hover:opacity-90'>
          Блог
        </Link>
      </nav>

      {/* Иконки справа */}
      <div className='flex items-center space-x-4'>
        <div>
          {token ? (
            <Link href='/profile' className='opacity-70 hover:opacity-90'>
              <UserCircle size={24} />
            </Link>
          ) : (
            <Link href='/login'>
              <Button>Войти</Button>
            </Link>
          )}
        </div>
        <Link href='/cart' className='opacity-70 hover:opacity-90'>
          <ShoppingCart size={24} />
        </Link>

        {/* Бургер-меню для мобильных устройств */}
        <Sheet>
          <SheetTrigger className='md:hidden'>
            <Menu size={24} className='opacity-70 hover:opacity-90' />
          </SheetTrigger>
          <SheetContent>
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
