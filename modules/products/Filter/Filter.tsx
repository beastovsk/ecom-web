'use client';

import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {getAllProducts} from '@/data/api/products'; // Импорт функции для получения продуктов с бэка
import Link from 'next/link';

export const Filter = () => {
  // Состояния
  const {data, isSuccess, isLoading} = useQuery('products', getAllProducts); // Получение продуктов с бэка
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState({min: '', max: ''});
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Обновление состояния продуктов при успешном запросе
  useEffect(() => {
    if (!isSuccess) return;
    const {products} = data;
    setProducts(products);
    setFilteredProducts(products); // Изначально отображаем все продукты
  }, [data, isSuccess]);

  // Обработчик сортировки
  const handleSortChange = (value) => {
    setSortOption(value);
    let sortedProducts = [...filteredProducts];

    switch (value) {
      case 'price-desc':
        sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'price-asc':
        sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  // Фильтрация продуктов по цене и категории
  const handleFilterProducts = () => {
    let filtered = products?.filter((product) => {
      const matchesPrice =
        (!priceRange.min || parseFloat(product.price) >= parseFloat(priceRange.min)) &&
        (!priceRange.max || parseFloat(product.price) <= parseFloat(priceRange.max));
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPrice && matchesCategory && matchesSearch;
    });

    handleSortChange(sortOption); // Применение текущей сортировки к отфильтрованным продуктам
    setFilteredProducts(filtered);
  };

  return (
    <div className='p-4'>
      {/* Секция фильтрации и сортировки */}
      <div className='flex flex-col md:flex-row items-center justify-between mb-6 gap-4'>
        {/* Информация о товарах */}
        <span className='text-sm md:text-base'>
          <b>Товары 1-{filteredProducts?.length}</b> из {products?.length}
        </span>
        {/* Секция сортировки */}
        <div className='flex items-center gap-2'>
          <p className='whitespace-nowrap text-sm md:text-base'>Сортировать по: </p>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Популярности' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='popularity'>Популярности</SelectItem>
              <SelectItem value='price-desc'>Стоимость ↓</SelectItem>
              <SelectItem value='price-asc'>Стоимость ↑</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Секция фильтров и товаров */}
      <div className='grid grid-cols-1 lg:grid-cols-filter mt-6 gap-8'>
        {/* Блок фильтрации по цене */}
        <div className='shadow-sm p-6 rounded-md h-max'>
          <h2 className='text-lg font-semibold mb-4'>Поиск</h2>
          <Input
            className='w-full mb-4'
            placeholder='Поиск по названию'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <h2 className='text-lg font-semibold mb-4'>Цена</h2>
          <div className='flex flex-col gap-4'>
            <div>
              <p className='text-md mb-1'>От</p>
              <Input
                className='w-full'
                placeholder='Минимум'
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
              />
            </div>
            <div>
              <p className='text-md mb-1'>До</p>
              <Input
                className='w-full'
                placeholder='Максимум'
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
              />
            </div>
          </div>

          {/* Фильтр по категории */}
          <h2 className='text-lg font-semibold mt-4'>Категория</h2>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className='mt-1'>
              <SelectValue placeholder='Выберите категорию' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Все</SelectItem> {/* Заменено значение с '' на 'all' */}
              <SelectItem value='Footwear'>Обувь</SelectItem>
              <SelectItem value='Clothing'>Одежда</SelectItem>
              <SelectItem value='Accessories'>Аксессуары</SelectItem>
            </SelectContent>
          </Select>

          {/* Кнопка "Поиск" */}
          <Button className='mt-5 w-full' onClick={handleFilterProducts}>
            Поиск
          </Button>
        </div>

        {/* Блок отображения товаров */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {isLoading ? (
            <p className='col-span-full text-center'>Загрузка...</p>
          ) : filteredProducts?.length ? (
            filteredProducts.map(({id, images, name, price}) => (
              <div key={id} className='flex flex-col items-center'>
                <Link href={`/products?id=${id}`} className='w-full'>
                  {' '}
                  <div
                    className='bg-gray-300 h-72 rounded-xl w-full mb-4'
                    style={{
                      backgroundImage: `url(${JSON.parse(images)[0].url})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <h3 className='text-lg font-semibold'>{name}</h3>
                  <p className='font-semibold opacity-70'>{price.toLocaleString()} R</p>
                </Link>
                <Button variant='secondary' className='mt-3 w-full'>
                  В корзину
                </Button>
              </div>
            ))
          ) : (
            <p className='col-span-full text-center'>Продукты не найдены.</p>
          )}
        </div>
      </div>
    </div>
  );
};
