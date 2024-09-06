'use client';

import {getCategories} from '@/data/api/categories';
import Link from 'next/link';
import {useQuery} from 'react-query';

export const Categories = () => {
  const {data, isSuccess, isLoading} = useQuery('categories', getCategories);

  if (isLoading) {
    return <p className='text-center text-lg'>Загрузка категорий...</p>;
  }

  return (
    <div className='p-6  rounded-lg max-w-4xl mx-auto'>
      {/* Заголовок */}
      <h2 className='text-3xl font-bold text-center  mb-8'>Категории товаров</h2>

      {/* Сетка категорий */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {isSuccess &&
          data?.categories.map(({name}, index) => (
            <Link
              key={index}
              href={`/products?category=${name}`}
              passHref
              className='relative p-6 rounded-lg shadow hover:shadow-lg transform transition duration-300 ease-in-out'
            >
              <div className='flex flex-col items-center justify-center h-full'>
                <h3 className='text-xl font-medium text-blue-800'>{name}</h3>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
