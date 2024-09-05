'use client';

import {CustomEditor} from '@/components/CustomEditor';
import {Button} from '@/components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {getAllOrders} from '@/data/api/order';
import {useQuery} from 'react-query';
import React from 'react';

export const Orders: React.FC = () => {
  // Получение списка заказов
  const {data: orders, isLoading, isSuccess} = useQuery('orders', getAllOrders);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Заказы</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Номер заказа</th>
              <th className='text-left p-2'>Имя клиента</th>
              <th className='text-left p-2'>Телефон</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td className='p-2'>#{order.id}</td>
                  <td className='p-2'>
                    {order.first_name} {order.last_name}
                  </td>
                  <td className='p-2'>{order.phone_number}</td>
                  <td className='p-2'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className='text-blue-600 hover:underline mr-4'>Подробнее</button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Заказ №{order.id}</DialogTitle>
                        <div className='mt-4'>
                          <h3 className='font-semibold'>Продукты:</h3>
                          <ul className='list-disc list-inside'>
                            {JSON.parse(order.products).map((product) => (
                              <li key={product.product_id} className='mb-2'>
                                {product.name} - {product.quantity} шт. по {product.price} руб.
                              </li>
                            ))}
                          </ul>
                          <h3 className='font-semibold mt-4'>Дополнительная информация:</h3>
                          <p>{order.additional_info}</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant='secondary'>Закрыть</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {/* <button className='text-red-600 hover:underline'>Удалить</button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
