export const Documents: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Документы</h1>
      <div className='bg-white p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Тип документа</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p-2'>Публичная оферта</td>
              <td className='p-2'>
                <button className='text-blue-600 hover:underline'>Изменить</button>
              </td>
            </tr>
            <tr>
              <td className='p-2'>Условия возврата</td>
              <td className='p-2'>
                <button className='text-blue-600 hover:underline'>Изменить</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить/Редактировать документ</h2>
          <form>
            <textarea placeholder='Содержимое документа' className='border p-2 w-full h-40 mb-4'></textarea>
            <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md'>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
