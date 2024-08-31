import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export const Products: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Продукты</h1>
      {/* Здесь будет таблица продуктов и форма для добавления/редактирования продуктов */}
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название</th>
              <th className='text-left p-2'>Цена</th>
              <th className='text-left p-2'>Категория</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {/* Пример строки */}
            <tr>
              <td className='p-2'>Продукт 1</td>
              <td className='p-2'>1000 руб.</td>
              <td className='p-2'>Категория 1</td>
              <td className='p-2'>
                <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                <button className='text-red-600 hover:underline'>Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Форма для добавления/редактирования */}
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новый продукт</h2>
          <form>
            <Input type='text' placeholder='Название продукта' className='border p-2 w-full mb-4' />
            <Input type='text' placeholder='Цена' className='border p-2 w-full mb-4' />
            <Textarea placeholder='Описание' className='border p-2 w-full mb-4'></Textarea>
            <Button className='px-4 py-2 rounded-md'>Сохранить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
