'use client';

import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {getAllProducts} from '@/data/api/products'; // Импорт функции для получения продуктов с бэка
import {getCategories} from '@/data/api/categories'; // Импорт функции для получения категорий с бэка
import Link from 'next/link';
import {ProductCard} from '@/modules/shop/ProductCard/ProductCard';

export const Filter = () => {
  // Router для получения search-параметров
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Состояния
  const {data: productsData, isSuccess: productsLoaded} = useQuery('products', getAllProducts); // Получение продуктов с бэка
  const {data: categoriesData, isSuccess: categoriesLoaded} = useQuery('categories', getCategories); // Получение категорий с бэка
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [priceRange, setPriceRange] = useState({min: '', max: ''});
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);

  // Обновление состояния продуктов при успешном запросе
  useEffect(() => {
    if (!productsLoaded) return;
    const {products} = productsData;
    setProducts(products);
    setFilteredProducts(products); // Изначально отображаем все продукты
  }, [productsData, productsLoaded]);

  // Установка категории из URL при первой загрузке
  useEffect(() => {
    const categoryFromURL = searchParams.get('category');
    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [searchParams]);

  // Обновление фильтров
  useEffect(() => {
    handleFilterProducts();
  }, [category, priceRange, searchQuery, sortOption]); // Добавил сортировку в зависимости для обновления

  // Фильтрация продуктов по цене, категории и строке поиска
  const handleFilterProducts = () => {
    let filtered = products?.filter((product) => {
      const matchesPrice =
        (!priceRange.min || parseFloat(product.price) >= parseFloat(priceRange.min)) &&
        (!priceRange.max || parseFloat(product.price) <= parseFloat(priceRange.max));
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesPrice && matchesCategory && matchesSearch;
    });

    // Применение текущей сортировки к отфильтрованным продуктам
    if (sortOption === 'price-desc') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === 'price-asc') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    setFilteredProducts(filtered);
  };

  // Обработчик изменения сортировки
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  // Обработчик добавления и удаления из корзины
  const handleCartToggle = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);
    if (isInCart) {
      setCart(cart.filter((item) => item.id !== product.id)); // Удаление из корзины
    } else {
      setCart([...cart, product]); // Добавление в корзину
    }
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
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className='mt-1'>
              <SelectValue placeholder='Выберите категорию' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Все</SelectItem>
              {categoriesLoaded &&
                categoriesData?.categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          {/* Кнопка "Поиск" */}
          <Button className='mt-5 w-full' onClick={handleFilterProducts}>
            Поиск
          </Button>
        </div>

        {/* Блок отображения товаров */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {productsLoaded && filteredProducts.length ? (
            filteredProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          ) : (
            <p className='col-span-full text-center'>Продукты не найдены.</p>
          )}
        </div>
      </div>
    </div>
  );
};
