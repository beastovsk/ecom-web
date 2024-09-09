'use client';

import React from 'react';
import Link from 'next/link';
import {useQuery} from 'react-query';
import {getAllBlogs} from '@/data/api/blog'; // Функция для получения всех блогов
import Image from 'next/image'; // Используем Image компонент Next.js для оптимизации изображений
import parse from 'html-react-parser';

const Blog: React.FC = () => {
  // Получаем данные блогов с помощью useQuery
  const {data, isLoading, error} = useQuery('blog', getAllBlogs);
  // console.log(parse(data.blogs[0].content));
  // Обработка состояния загрузки и ошибок
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Произошла ошибка при загрузке статей.</p>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data?.blogs?.map((post: any) => {
          // Парсим изображение из строки JSON
          const parsedImage = JSON.parse(post.images);

          return (
            <div key={post.id} className='shadow-md rounded-lg overflow-hidden'>
              {/* Изображение статьи */}
              <Image
                src={parsedImage.url}
                alt={post.title}
                width={400}
                height={200}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <div className='flex justify-between items-center text-gray-500 text-sm mb-2'>
                  {/* Здесь можно отобразить дату или категорию, если они есть */}
                  <span>Статья</span>
                </div>
                <h2 className='text-2xl font-bold mb-2'>
                  <Link href={`/blog?article=${post.id}`}>{post.title}</Link>
                </h2>
                {/* Выводим часть контента статьи или краткое описание */}
                <p className='text-gray-700 mb-4 h-10'>{parse(post.content)}</p>
                <Link href={`/blog?article=${post.id}`} className='text-blue-600 hover:underline'>
                  Подробнее
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
