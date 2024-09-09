'use client';

import * as React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useMutation} from 'react-query';
import {createOrder} from '@/data/api/order';
import {useRouter} from 'next/navigation';

// Схема валидации с помощью Zod
const orderSchema = z.object({
  firstName: z.string().min(1, 'Введите имя'),
  lastName: z.string().min(1, 'Введите фамилию'),
  phoneNumber: z.string().min(10, 'Введите корректный номер телефона').max(15, 'Слишком длинный номер телефона'),
  additionalInfo: z.string().optional()
});

export const Order = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const {toast} = useToast();
  const {mutate} = useMutation(createOrder);
  const router = useRouter();

  React.useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: zodResolver(orderSchema)
  });

  const onSubmit = async (data) => {
    try {
      // Подготовка массива продуктов для отправки на сервер
      const products = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      mutate(
        {...data, products},
        {
          onSuccess: ({message}) => {
            toast({title: 'Информация о заказе', description: message});
            router.push('/profile');
            localStorage.removeItem('cart');
          }
        }
      );
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 shadow-md rounded-md'>
      <h2 className='text-2xl font-bold mb-6'>Детали заказа</h2>

      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <Input placeholder='Имя' {...register('firstName')} />
            {/* @ts-ignore */}
            {errors.firstName && <p className='text-red-600'>{errors.firstName.message}</p>}
          </div>
          <div>
            <Input placeholder='Фамилия' {...register('lastName')} />
            {/* @ts-ignore */}
            {errors.lastName && <p className='text-red-600'>{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <Input placeholder='Номер телефона' type='tel' {...register('phoneNumber')} />
          {/* @ts-ignore */}
          {errors.phoneNumber && <p className='text-red-600'>{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <Input placeholder='Дополнительная информация' {...register('additionalInfo')} />
        </div>

        <div className='mt-8'>
          <h4 className='text-lg font-semibold'>Ваши товары:</h4>
          <ul className='list-disc list-inside pl-4 mt-2'>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity} шт. - {item.price} ₽
                </li>
              ))
            ) : (
              <p>Корзина пуста</p>
            )}
          </ul>
        </div>

        <div className='mt-8 flex justify-end'>
          <Button type='submit'>Отправить заказ</Button>
        </div>
      </form>
    </div>
  );
};
