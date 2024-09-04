'use client';

import {useQuery} from 'react-query';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {getUserOrders} from '@/data/api/order';
import {formatProductPrice} from '@/src/helpers/hooks';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {useToast} from '@/components/ui/use-toast';

export const Profile = () => {
  // Получаем заказы через react-query
  const {data, isSuccess, isLoading, error} = useQuery('userOrders', getUserOrders);
  const router = useRouter();
  const token = getCookie('token');
  const {toast} = useToast();

  useEffect(() => {
    if (!isSuccess) return;

    if (data) return;

    if (!token) {
      router.push('/login');
    }

    if (token) {
      deleteCookie('token');
      toast({title: 'Уведомление', description: 'Сессия была завершена, пожалуйста перезайдите'});
    }
  }, [data, isSuccess]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки заказов</p>;

  const orders = data || [];

  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Личный кабинет</h1>
      </div>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <nav className='grid gap-4 text-sm text-muted-foreground'>
          <Link href='#' className='font-semibold text-primary'>
            История заказов
          </Link>
        </nav>
        <div className='grid gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Список заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-beige'>
                    <th className='text-left py-4 px-6'>Номер заказа</th>
                    <th className='text-left py-4 px-6'>Имя</th>
                    <th className='text-left py-4 px-6'>Телефон</th>
                    <th className='text-left py-4 px-6'>Количество</th>
                    <th className='text-left py-4 px-6'>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td className='py-4 px-6 flex items-center'>
                          <span className='text-gray-700 whitespace-nowrap'>№{order.id}</span>
                        </td>
                        <td className='py-4 px-6 whitespace-nowrap'>
                          {order.first_name} {order.last_name}
                        </td>
                        <td className='py-4 px-6 whitespace-nowrap'>{order.phone_number}</td>

                        <td className='py-4 px-6 whitespace-nowrap'>
                          {order.products ? `${JSON.parse(order.products).length} позиция` : 'No products'}
                        </td>
                        <td className='py-4 px-6 whitespace-nowrap'>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant='link' className='text-blue-600 hover:underline mr-4'>
                                Подробнее
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogTitle>Подробнее о заказе №{order.id}</DialogTitle>
                              <DialogContent>
                                {/* Здесь можно отобразить подробную информацию о заказе */}
                                <p>
                                  <b>Имя:</b> {order.first_name} {order.last_name}
                                </p>
                                <p>
                                  <b>Телефон:</b> {order.phone_number}
                                </p>
                                <p>
                                  <b>Дополнительная информация:</b>{' '}
                                  {order.additional_info || 'Нет дополнительной информации'}
                                </p>
                                <p>
                                  <b>Товары:</b>{' '}
                                  <div className='flex flex-col gap-2'>
                                    {JSON.parse(order.products).map(({name, price, quantity}) => (
                                      <span>
                                        {name} x {quantity} - {formatProductPrice(price)}
                                      </span>
                                    ))}
                                  </div>
                                </p>
                              </DialogContent>
                              <DialogFooter>
                                <Button variant='outline'>Закрыть</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className='py-4 px-6 text-center'>
                        Нет заказов
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
