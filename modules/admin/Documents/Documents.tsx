'use client';
import {CustomEditor} from '@/components/CustomEditor';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';

export const Documents: React.FC = () => {
  const handleEditor = (value) => {
    console.log(value);
  };
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Документы</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Тип документа</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Условия возврата</td>
              <td className='p-2'>
                <Dialog>
                  <DialogTrigger>
                    <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Изменить документ</DialogTitle>
                    <CustomEditor getValue={handleEditor} />

                    <DialogFooter>
                      <Button className='mt-10'>Сохранить</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>{' '}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
