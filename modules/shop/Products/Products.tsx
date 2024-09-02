'use client';

import {Button} from '@/components/ui/button';
import {getAllProducts} from '@/data/api/products';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {Skeleton} from '@/components/ui/skeleton';

export const Products = () => {
  const {data, isSuccess, isLoading} = useQuery('products', getAllProducts);
  const [products, setProducts] = useState([]);

  // Обновление состояния продуктов при успешном запросе
  useEffect(() => {
    if (!isSuccess) return;
    const {products} = data;
    setProducts(products?.length ? products.slice(0, 3) : []); // Показываем первые 3 продукта
  }, [data, isSuccess]);

  return (
    <div className='p-4'>
      {/* Заголовок */}
      <h2 className='text-2xl font-semibold text-center mb-6'>Последние продукты</h2>

      {/* Сетка продуктов */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {isLoading ? (
          // Скелетон при загрузке
          Array.from({length: 4}).map((_, index) => (
            <div key={index} className='flex flex-col items-center'>
              <Skeleton className='h-72 w-full mb-4' />
              <Skeleton className='h-6 w-1/2 mb-2' />
              <Skeleton className='h-5 w-1/3' />
            </div>
          ))
        ) : products.length ? (
          // Карточки продуктов при успешной загрузке
          products.map(({id, images, name, price}) => (
            <div key={id} className='flex flex-col items-center'>
              <Link href={`/products?id=${id}`} className='w-full'>
                {' '}
                <div
                  className='bg-gray-300 h-72 rounded-xl w-full mb-4'
                  style={{
                    backgroundImage: `url(${JSON.parse(images)[0].url})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <h3 className='text-lg font-semibold'>{name}</h3>
                <p className='font-semibold opacity-70'>{price.toLocaleString()} R</p>
              </Link>
              <Button variant='secondary' className='mt-3 w-full'>
                В корзину
              </Button>
            </div>
          ))
        ) : (
          // Сообщение, если данных нет
          <p className='col-span-full text-center'>Продукты не найдены.</p>
        )}
      </div>

      {/* Кнопка "Показать еще" */}
      <div className='flex justify-center mt-8'>
        <Link href='/products'>
          <Button>Показать еще</Button>
        </Link>
      </div>
    </div>
  );
};
