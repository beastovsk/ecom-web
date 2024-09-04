'use client'; // Клиентский компонент для использования состояния и маршрутизации

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Alert} from '@/components/ui/alert';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {setCookie} from 'cookies-next';
import {useToast} from '@/components/ui/use-toast';

export const Auth = () => {
  const router = useRouter();

  // Состояния для управления формой и ошибок
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {toast} = useToast();
  // Функция обработки отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Сравниваем введенные данные с переменными окружения
    if (login === process.env.NEXT_PUBLIC_LOGIN && password === process.env.NEXT_PUBLIC_PASS) {
      setCookie('adminToken', process.env.NEXT_PUBLIC_LOGIN);
      toast({title: 'Уведомление входа', description: 'Успешный вход'});

      router.push('/admin'); // Перенаправление на страницу /admin
    } else {
      toast({title: 'Уведомление входа', description: 'Неверный логин или пароль'});
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 rounded shadow-md'>
        <h2 className='text-2xl font-bold text-center mb-3'>Авторизация</h2>
        <p className='text-lg text-center mb-6'>Админ-панель</p>
        {/* Сообщение об ошибке, если данные неверны */}
        {/* {error && <Alert type='error'>{error}</Alert>} */}
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            {/* Поле ввода логина */}
            <Input
              type='text'
              placeholder='Логин'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='mb-6'>
            {/* Поле ввода пароля */}
            <Input
              type='password'
              placeholder='Пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded'
            />
          </div>
          {/* Кнопка отправки формы */}
          <Button type='submit' className='w-full py-2 rounded'>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};
