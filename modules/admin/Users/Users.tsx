'use client';

import {useMutation, useQuery} from 'react-query';
import {getAllUsers} from '@/data/api/admin'; // Предположим, что путь к API правильный
import {Button} from '@/components/ui/button'; // Предположим, что у нас есть компонент Button
import {useState} from 'react';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';

export const Users: React.FC = () => {
  const {data, isLoading, error} = useQuery('users', getAllUsers);

  // Стейт для подтверждения удаления
  const [deleteConfirmation, setDeleteConfirmation] = useState<{userId: number; isVisible: boolean}>({
    userId: 0,
    isVisible: false
  });

  // Обработчик для удаления пользователя (должна быть функция для удаления с сервера)
  const handleDeleteUser = async (userId: number) => {
    // Пример удаления пользователя с сервера
    // await deleteUser(userId);
    alert(`Пользователь с ID ${userId} удален.`); // Временно показываем alert, т.к. нет логики удаления
    // Перезагрузка списка пользователей после удаления
  };

  if (isLoading) {
    return <p>Загрузка пользователей...</p>;
  }

  if (error) {
    return <p>Произошла ошибка при загрузке пользователей.</p>;
  }

  const users = data?.users || [];

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Пользователи</h1>
      <div className='p-4 shadow-md rounded-lg overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='text-left p-2 border-b'>ID</th>
              <th className='text-left p-2 border-b'>Email</th>
              <th className='text-left p-2 border-b'>Дата регистрации</th>
              <th className='text-left p-2 border-b'>Количество заказов</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='p-2 border-b'>{user.id}</td>
                <td className='p-2 border-b'>{user.email}</td>
                <td className='p-2 border-b'>{user.registerdate}</td>
                <td className='p-2 border-b'>{user.amountorders}</td>
                {/* <td className='p-2 border-b'>
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant='destructive'
                        onClick={() => setDeleteConfirmation({userId: user.id, isVisible: true})}
                      >
                        Удалить
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className='p-4 shadow-lg rounded-md'>
                        <p>Вы уверены, что хотите удалить пользователя с ID {user.id}?</p>
                        <div className='mt-4 flex space-x-4'>
                          <Button variant='destructive' onClick={() => handleDeleteUser(user.id)}>
                            Удалить
                          </Button>
                          <Button
                            variant='secondary'
                            onClick={() => setDeleteConfirmation({userId: 0, isVisible: false})}
                          >
                            Отмена
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td> */}
                <td className='p-2 border-b'></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
