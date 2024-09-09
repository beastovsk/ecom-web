'use client'; // Необходим для компонентов, которые используют интерактивные элементы

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Menu, ShoppingCart, UserCircle} from 'lucide-react';
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet';
import {getCookie} from 'cookies-next';
import {Button} from '../ui/button';
import Image from 'next/image';
import {Badge} from 'antd';
import {Skeleton} from '../ui/skeleton';
import {useCartStore} from '@/data/store/store'; // Импортируйте ваш Zustand-стор

export const Header = ({shop}) => {
  const [token, setToken] = useState(null); // Используем состояние для токена
  const {totalQuantity, updateQuantity} = useCartStore(); // Используем Zustand-стор
  console.log(shop);

  useEffect(() => {
    // Получаем токен только на клиенте
    const userToken = getCookie('token');
    setToken(userToken);

    // Обновляем количество товаров в корзине при монтировании
    const updateCartQuantity = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      updateQuantity(totalQuantity);
    };

    updateCartQuantity(); // Инициализация количества

    // Обработчик события изменения localStorage
    window.addEventListener('storage', updateCartQuantity);

    // Очистка обработчика при размонтировании компонента
    return () => {
      window.removeEventListener('storage', updateCartQuantity);
    };
  }, [updateQuantity]); // Пустой массив зависимостей чтобы эффект выполнялся только один раз на монтирование компонента

  return (
    <header className='flex items-center justify-between p-4 shadow-sm'>
      {/* Лого */}
      <div className='flex items-center space-x-2'>
        {/* Проверяем, что логотип доступен перед рендерингом */}
        {shop?.logo && <Image src={shop?.logo} alt={shop?.name} width={50} height={50} className='rounded-full' />}
        <span className='font-bold text-lg'>{shop?.name}</span>
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
          <Badge count={totalQuantity} className='mr-2 text-inherit'>
            <ShoppingCart size={24} />
          </Badge>
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
