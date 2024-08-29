'use client';

import * as React from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export const Order = () => {
  const [orderSuccess, setOrderSuccess] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно обработать отправку данных на сервер
    setOrderSuccess(true); // Показываем уведомление об успешном заказе
  };

  return (
    <div className='max-w-4xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-6'>Детали заказа</h2>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <Input placeholder='Имя' required />
          <Input placeholder='Фамилия' required />
        </div>
        <Input placeholder='Номер телефона' required type='tel' />
        <Input placeholder='Адрес' required />
        <Input placeholder='Дополнительная информация' />

        <div className='mt-8'>
          <h4 className='text-lg font-semibold'>Ваши товары:</h4>
          <ul className='list-disc list-inside pl-4 mt-2'>
            {/* Здесь можно отобразить товары из заказа */}
            <li>Диван Asgaard - 1 шт. - 250 000,00 ₽</li>
          </ul>
        </div>

        <div className='mt-8 flex justify-end'>
          <Button type='submit'>Отправить заказ</Button>
        </div>
      </form>
    </div>
  );
};
