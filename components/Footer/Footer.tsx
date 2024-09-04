'use client';

import React from 'react';
import Link from 'next/link';
import {Icon} from 'lucide-react';
import {Dialog, DialogTrigger, DialogContent, DialogHeader} from '../ui/dialog';
import {useQuery} from 'react-query';
import {getDocuments} from '@/data/api/documents';
import parse from 'html-react-parser'; // Импортируем библиотеку для парсинга HTML

export const Footer = ({shop}) => {
  const {data} = useQuery('docs', getDocuments);

  return (
    <footer className='border-t border-gray-200 py-8'>
      <div className='container mx-auto px-4'>
        {/* Верхняя часть футера */}
        <div className='flex flex-col md:flex-row justify-between mb-8'>
          {/* Левая колонка - Лого и контакты */}
          <div className='mb-6 md:mb-0'>
            <div className='flex items-center space-x-2 mb-4'>
              {/* Абстрактное лого */}
              <span className='font-bold text-lg'>{shop.name}</span>
            </div>
            {/* Контактная информация */}
            <div className='text-gray-600 space-y-1'>
              <p>Телефон: {shop.phone}</p>
              <p>ИНН: {shop.inn}</p>
              <p>Адрес: {shop.address}</p>
            </div>
          </div>

          {/* Правая колонка - Ссылки сайта и документы */}
          <div className='flex mb-6 md:mb-0 md:w-1/2 justify-around flex-col md:flex-row items-start'>
            {/* Ссылки сайта */}
            <div className='mb-4 md:mb-0'>
              <h4 className='font-semibold mb-2'>Ссылки сайта</h4>
              <nav className='space-y-1 text-gray-600 flex flex-col items-start'>
                <Link href='/'>Главная</Link>
                <Link href='/products'>Продукты</Link>
                <Link href='/contacts'>Контакты</Link>
              </nav>
            </div>

            {/* Список документов */}
            <div>
              <h4 className='font-semibold mb-2'>Документы</h4>
              <nav className='space-y-1 text-gray-600 flex flex-col items-start'>
                {data?.documents.map((document) => (
                  <Dialog key={document.id}>
                    <DialogTrigger asChild>
                      <button className='underline text-blue-600 hover:text-blue-800'>{document.name}</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>{document.name}</DialogHeader>
                      <div className='p-4'>{parse(document.content)}</div>
                    </DialogContent>
                  </Dialog>
                ))}
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
