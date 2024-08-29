export const Categories = () => {
  return (
    <div className='p-4'>
      {/* Заголовок */}
      <h2 className='text-2xl font-semibold text-center mb-6'>Категории товаров</h2>

      {/* Сетка категорий */}
      <div className='flex flex-col sm:flex-row flex-wrap items-center gap-6 justify-center'>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className='flex flex-col items-center w-full sm:w-72'>
            <div className='bg-gray-300 h-64 rounded-xl w-full'></div>
            <h3 className='text-lg font-semibold mt-4 text-center'>Спальня</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
