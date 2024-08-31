'use client';
import {CustomEditor} from '@/components/CustomEditor';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';

export const Blog: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Блог</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название статьи</th>
              <th className='text-left p-2'>Изображение</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Пост 1</td>
              <td className='p-2'>
                <img src='/images/post1.jpg' alt='Post 1' className='w-32' />
              </td>
              <td className='p-2'>
                <Dialog>
                  <DialogTrigger>
                    <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Изменить cтатью</DialogTitle>
                    <Input type='text' placeholder='Название поста' className='border p-2 w-full mb-4' />
                    <CustomEditor getValue={(e) => {}} />
                    <DialogFooter>
                      <Button className='mt-10'>Сохранить</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{' '}
                <button className='text-red-600 hover:underline'>Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новую статью</h2>
          <form>
            <Input type='text' placeholder='Название поста' className='border p-2 w-full mb-4' />
            <CustomEditor getValue={(e) => {}} />
            <Button className='px-4 py-4 mt-2 rounded-md'>Сохранить</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
