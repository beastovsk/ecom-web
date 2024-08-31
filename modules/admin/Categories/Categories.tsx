import React from 'react';

export const Categories: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Категории</h1>
      <div className='bg-white p-4 shadow-md rounded-lg'>
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
                <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                <button className='text-red-600 hover:underline'>Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Форма для добавления/редактирования */}
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новую категорию</h2>
          <form>
            <input type='text' placeholder='Название категории' className='border p-2 w-full mb-4' />
            <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
