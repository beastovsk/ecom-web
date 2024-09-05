'use client';

import React, {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {Button} from '@/components/ui/button';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {createCategory, updateCategory, deleteCategory, getCategories} from '@/data/api/categories';

export const Categories: React.FC = () => {
  const queryClient = useQueryClient();
  const [editCategory, setEditCategory] = useState<{id: number; name: string} | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Получение категорий
  const {data, isLoading, isError, refetch} = useQuery('categories', getCategories);

  // Мутация для создания категории
  const createMutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      setNewCategoryName('');
      refetch();
    }
  });

  // Мутация для обновления категории
  const updateMutation = useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      setEditCategory(null);
      refetch();
    }
  });

  // Мутация для удаления категории
  const deleteMutation = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      refetch();
    }
  });

  // Обработчики
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({name: newCategoryName});
  };

  const handleUpdate = (e: React.FormEvent) => {
    if (editCategory) {
      updateMutation.mutate({id: editCategory.id, name: editCategory.name});
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading categories.</p>;

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
            {data?.categories?.map((category) => (
              <tr key={category.id}>
                <td className='p-2'>{category.name}</td>
                <td className='p-2'>
                  <Dialog>
                    <DialogTrigger>
                      <button
                        className='text-blue-600 hover:underline mr-4'
                        onClick={() => setEditCategory({id: category.id, name: category.name})}
                      >
                        Изменить
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Изменить категорию</DialogTitle>
                      <Input
                        type='text'
                        value={editCategory?.name || ''}
                        onChange={(e) => setEditCategory({...editCategory!, name: e.target.value})}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button onClick={handleUpdate}>Сохранить</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <button className='text-red-500 hover:underline'>Удалить</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Удалить?</DialogTitle>
                      <DialogFooter>
                        <Button variant='destructive' onClick={() => handleDelete(category.id)}>
                          Подтвердить
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новую категорию</h2>
          <form onSubmit={handleCreate}>
            <Input
              type='text'
              placeholder='Название категории'
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className='border p-2 w-full mb-4'
            />
            <Button type='submit' className='px-4 py-2 rounded-md'>
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
