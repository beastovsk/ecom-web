import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export const Filter = () => {
  return (
    <div className='p-4'>
      {/* Секция фильтрации и сортировки */}
      <div className='flex flex-col md:flex-row items-center justify-between mb-6 gap-4'>
        {/* Информация о товарах */}
        <span className='text-sm md:text-base'>
          <b>Товары 1-20</b> из 2,356
        </span>
        {/* Секция сортировки */}
        <div className='flex items-center gap-2'>
          <p className='whitespace-nowrap text-sm md:text-base'>Сортировать по: </p>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='popularity' defaultChecked>
                Популярности
              </SelectItem>
              <SelectItem value='price-desc'>Стоимость ↓</SelectItem>
              <SelectItem value='price-asc'>Стоимость ↑</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Секция фильтров и товаров */}
      <div className='grid grid-cols-1 lg:grid-cols-filter mt-6 gap-8'>
        {/* Блок фильтрации по цене */}
        <div className='shadow-sm p-6 rounded-md'>
          <h2 className='text-lg font-semibold mb-4'>Цена</h2>
          <div className='flex flex-col gap-4'>
            <div>
              <p className='text-md mb-1'>От</p>
              <Input className='w-full' />
            </div>
            <div>
              <p className='text-md mb-1'>До</p>
              <Input className='w-full' />
            </div>
          </div>
        </div>

        {/* Блок отображения товаров */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className='flex flex-col items-center'>
              <div className='bg-gray-300 h-72 rounded-xl w-full mb-4'></div>
              <h3 className='text-lg font-semibold'>Спальня</h3>
              <p className='font-semibold opacity-70'>2,000.00 R</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
