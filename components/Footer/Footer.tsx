'use client'; // Для использования клиентских компонентов

import React from 'react';
import Link from 'next/link';
import {Icon} from 'lucide-react'; // Использование иконок, если необходимо
import {Dialog, DialogTrigger} from '@radix-ui/react-dialog';
import {DialogContent, DialogHeader} from '../ui/dialog';

export const Footer = () => {
  return (
    <footer className='border-t border-gray-200 py-8'>
      <div className='container mx-auto px-4'>
        {/* Верхняя часть футера */}
        <div className='flex flex-col md:flex-row justify-between mb-8'>
          {/* Левая колонка - Лого и контакты */}
          <div className='mb-6 md:mb-0'>
            <div className='flex items-center space-x-2 mb-4'>
              {/* Абстрактное лого */}
              <span className='font-bold text-lg'>Лого</span>
            </div>
            {/* Контактная информация */}
            <div className='text-gray-600 space-y-1'>
              <p>Телефон: +7 (123) 456-78-90</p>
              <p>ИНН: 1234567890</p>
              <p>Адрес: ул. Примерная, 1, Москва, Россия</p>
            </div>
          </div>

          <div className='flex mb-6 md:mb-0 md:w-1/2 justify-around flex-col md:flex-row items-start'>
            <div className='mb-4 md:mb-0'>
              <h4 className='font-semibold mb-2'>Ссылки сайта</h4>
              <nav className='space-y-1 text-gray-600 flex flex-col items-start'>
                <Link href='/'>Главная</Link>
                <Link href='/products'>Продукты</Link>
                <Link href='/contacts'>Контакты</Link>
              </nav>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Документы</h4>
              <nav className='space-y-1 text-gray-600 flex flex-col items-start'>
                <Dialog>
                  <DialogTrigger>Публичная оферта</DialogTrigger>
                  <DialogContent> asdsad</DialogContent>
                </Dialog>
              </nav>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className='border-t border-gray-200 pt-4 text-center text-sm text-gray-500'>
          <p>© 2024 Все права защищены.</p>
          <p>
            Разработка сайта -{' '}
            <Link href='https://t.me/beastovsk' className='underline'>
              https://t.me/beastovsk
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
