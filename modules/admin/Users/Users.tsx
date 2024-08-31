export const Users: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Пользователи</h1>
      <div className='bg-white p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Имя</th>
              <th className='text-left p-2'>Email</th>
              <th className='text-left p-2'>Дата регистрации</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Иван Иванов</td>
              <td className='p-2'>ivan@example.com</td>
              <td className='p-2'>01.01.2022</td>
              <td className='p-2'>
                <button className='text-red-600 hover:underline'>Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
