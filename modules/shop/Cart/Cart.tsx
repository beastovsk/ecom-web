'use client';

import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {getCookie} from 'cookies-next';
import {useToast} from '@/components/ui/use-toast';
import {useRouter} from 'next/navigation';
import {useMutation} from 'react-query';
import {createOrder} from '@/data/api/order';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const token = getCookie('token');
  const {toast} = useToast();
  const router = useRouter();

  useEffect(() => {
    // Загружаем корзину из localStorage при монтировании компонента
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Сохраняем корзину в localStorage при изменении cartItems
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? {...item, quantity: Math.max(quantity, 1)} : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = () => {
    if (!token) {
      toast({title: 'Оформление заказа', description: 'Для отслеживания заказа - зайдите пожалуйста в профиль '});
      return router.push('/login');
    }
    router.push('/order');
  };

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
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <tr className='border-b' key={item.id}>
                    <td className='py-4 px-6 flex items-center'>
                      <span className='text-gray-700 whitespace-nowrap'>{item.name}</span>
                    </td>
                    <td className='py-4 px-6 whitespace-nowrap'>{item.price.toLocaleString('ru-RU')} ₽</td>
                    <td className='py-4 px-6 whitespace-nowrap'>
                      <Input
                        type='number'
                        value={item.quantity}
                        min='1'
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className='border rounded w-16 text-center'
                      />
                    </td>
                    <td className='py-4 px-6 whitespace-nowrap'>
                      {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                    </td>
                    <td className='py-4 px-2 text-center'>
                      <button onClick={() => removeItem(item.id)}>
                        <span role='img' aria-label='Удалить'>
                          🗑️
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='py-4 px-6 text-center text-gray-500'>
                    Корзина пуста
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Блок итогов корзины */}
      <div className='w-full md:w-1/3 bg-beige p-6 rounded-md'>
        <h3 className='text-lg font-bold mb-4'>Итоги корзины</h3>
        <div className='flex justify-between mb-2'>
          <span>Промежуточный итог:</span>
          <span className='text-gray-700'>{calculateTotal()} ₽</span>
        </div>
        <div className='flex justify-between mb-4'>
          <span className='font-semibold'>Итого:</span>
          <span className='font-semibold text-primary'>{calculateTotal()} ₽</span>
        </div>
        <Button className='w-full py-2 bg-primary' onClick={handleSubmit}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
