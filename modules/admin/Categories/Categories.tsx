import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import React from 'react';

export const Categories: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Категории</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {/* Пример строки */}
            <tr>
              <td className='p-2'>Категория 1</td>
              <td className='p-2'>
                <Dialog>
                  <DialogTrigger>
                    <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Изменить категорию</DialogTitle>
                    <Input />
                    <DialogFooter>
                      <Button>Сохранить</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <button className='text-red-500 hover:underline mr-4'>Удалить</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Удалить?</DialogTitle>
                    <DialogFooter>
                      <Button variant='destructive'>Подтвердить</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Форма для добавления/редактирования */}
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новую категорию</h2>
          <form>
            <Input type='text' placeholder='Название категории' className='border p-2 w-full mb-4' />
            <Button type='submit' className='px-4 py-2 rounded-md'>
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
