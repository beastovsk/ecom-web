export const ShopInfo: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Информация о магазине</h1>
      <div className='bg-white p-4 shadow-md rounded-lg'>
        <form>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Название магазина</label>
            <input type='text' placeholder='Название магазина' className='border p-2 w-full' />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Описание</label>
            <textarea placeholder='Описание магазина' className='border p-2 w-full h-24'></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Логотип</label>
            <input type='file' className='border p-2 w-full' />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>SEO теги</label>
            <input type='text' placeholder='SEO теги' className='border p-2 w-full' />
          </div>
          <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md'>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};
