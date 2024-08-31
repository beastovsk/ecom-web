import Link from 'next/link';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Checkbox} from '@/components/ui/checkbox';
import {Input} from '@/components/ui/input';

export const Profile = () => {
  return (
    <main className='flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-2'>
        <h1 className='text-3xl font-semibold'>Личный кабинет</h1>
      </div>
      <div className='mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]'>
        <nav className='grid gap-4 text-sm text-muted-foreground' x-chunk='dashboard-04-chunk-0'>
          <Link href='#' className='font-semibold text-primary'>
            История заказов
          </Link>
        </nav>
        <div className='grid gap-6'>
          <Card x-chunk='dashboard-04-chunk-1'>
            <CardHeader>
              <CardTitle>Список заказов</CardTitle>
              <CardDescription>Ниже указаны продукты, которые вы заказывали ранее</CardDescription>
            </CardHeader>
            <CardContent>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-beige'>
                    <th className='text-left py-4 px-6'>Продукт</th>
                    <th className='text-left py-4 px-6'>Цена</th>
                    <th className='text-left py-4 px-6'>Количество</th>
                    <th className='text-left py-4 px-6'>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};
