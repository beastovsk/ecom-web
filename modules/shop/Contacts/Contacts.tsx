'use client';

import * as React from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export const Contacts = () => {
  return (
    <div className='mx-auto p-6 shadow-md rounded-md grid grid-cols-1 sm:grid-cols-2 gap-8'>
      {/* Левая часть с информацией о компании */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Контакты компании</h2>
        <ul className='space-y-2 text-stone-700'>
          <li>
            <strong>Телефон:</strong> +7 (495) 123-45-67
          </li>
          <li>
            <strong>Адрес:</strong> г. Москва, ул. Пушкина, д. 10
          </li>
          <li>
            <strong>ИНН:</strong> 7701234567
          </li>
          <li>
            <strong>Email:</strong> info@company.com
          </li>
        </ul>
      </div>

      {/* Правая часть с формой */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Свяжитесь с нами</h2>
        <form className='space-y-4'>
          <Input placeholder='Имя' required />
          <Input type='email' placeholder='Электронная почта' required />
          <Textarea placeholder='Сообщение' required className='min-h-[120px]' />
          <Button type='submit' className='mt-4'>
            Отправить сообщение
          </Button>
        </form>
      </div>
    </div>
  );
};
