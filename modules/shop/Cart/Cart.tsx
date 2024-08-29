import React from 'react';
import {Button} from '@/components/ui/button';

export const Cart = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between mt-10 gap-10'>
      {/* Блок с товаром */}
      <div className='w-full md:w-2/3'>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-beige'>
                <th className='text-left py-4 px-6'>Продукт</th>
                <th className='text-left py-4 px-6'>Цена</th>
                <th className='text-left py-4 px-6'>Количество</th>
                <th className='text-left py-4 px-6'>Сумма</th>
                <th className='py-4 px-6'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b'>
                <td className='py-4 px-6 flex items-center'>
                  <img
                    src='/images/asgaard-sofa.png'
                    alt='Asgaard sofa'
                    className='hidden md:flex w-16 h-16 rounded-md mr-4'
                  />
                  <span className='text-gray-700 whitespace-nowrap'>Диван Asgaard</span>
                </td>
                <td className='py-4 px-6 whitespace-nowrap'>250 000,00 ₽</td>
                <td className='py-4 px-6 whitespace-nowrap'>
                  <input type='number' defaultValue='1' min='1' className='border rounded w-16 text-center' />
                </td>
                <td className='py-4 px-6 whitespace-nowrap'>250 000,00 ₽</td>
                <td className='py-4 px-2 text-center'>
                  <button>
                    <span role='img' aria-label='Удалить'>
                      🗑️
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Блок итогов корзины */}
      <div className='w-full md:w-1/3 bg-beige p-6 rounded-md'>
        <h3 className='text-lg font-bold mb-4'>Итоги корзины</h3>
        <div className='flex justify-between mb-2'>
          <span>Промежуточный итог:</span>
          <span className='text-gray-700'>250 000,00 ₽</span>
        </div>
        <div className='flex justify-between mb-4'>
          <span className='font-semibold'>Итого:</span>
          <span className='font-semibold text-primary'>250 000,00 ₽</span>
        </div>
        <Button className='w-full py-2 bg-primary'>Оформить заказ</Button>
      </div>
    </div>
  );
};
