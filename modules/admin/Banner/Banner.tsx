import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';

export const Banner: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Баннеры</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название баннера</th>
              <th className='text-left p-2'>Изображение</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Баннер 1</td>
              <td className='p-2'>
                <img src='/images/banner1.jpg' alt='Banner 1' className='w-32' />
              </td>
              <td className='p-2'>
                <Dialog>
                  <DialogTrigger>
                    <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Изменить баннер</DialogTitle>
                    <Input type='text' placeholder='Название баннера' className='border p-2 w-full mb-4' />
                    <Input type='file' className='border p-2 w-full mb-4' />
                  
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
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новый баннер</h2>
          <form>
            <Input type='text' placeholder='Название баннера' className='border p-2 w-full mb-4' />
            <Input type='file' className='border p-2 w-full mb-4' />
            <Button type='submit' className='px-4 py-2 rounded-md'>
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
