import {Button} from '@/components/ui/button';
import Link from 'next/link';

export const Products = () => {
  return (
    <div className='p-4'>
      {/* Заголовок */}
      <h2 className='text-2xl font-semibold text-center mb-6'>Последние продукты</h2>

      {/* Сетка продуктов */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className='flex flex-col items-center'>
            <div className='bg-gray-300 h-72 rounded-xl w-full mb-4'></div>
            <h3 className='text-lg font-semibold'>Спальня</h3>
            <p className='font-semibold opacity-70'>2,000.00 R</p>
          </div>
        ))}
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
