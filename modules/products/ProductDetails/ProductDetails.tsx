'use client';

import {useQuery} from 'react-query';
import {useState, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {getProductById} from '@/data/api/products';
import parse from 'html-react-parser';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
export const ProductDetails = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  // Функция для получения корзины из localStorage
  const getCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  };

  // Функция для обновления корзины в localStorage
  const updateCartInLocalStorage = (cart) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  useEffect(() => {
    if (product) {
      const cart = getCartFromLocalStorage();
      const productInCart = cart.find((item) => item.id === product.id);
      setQuantity(productInCart ? productInCart.quantity : 1);
      setIsInCart(!!productInCart);
    }
  }, [product]);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(quantity + change, 1);
    setQuantity(newQuantity);
    if (isInCart) {
      const cart = getCartFromLocalStorage();
      const updatedCart = cart.map((item) => (item.id === product.id ? {...item, quantity: newQuantity} : item));
      updateCartInLocalStorage(updatedCart);
    }
  };

  const handleCartUpdate = () => {
    const cart = getCartFromLocalStorage();
    if (isInCart) {
      // Удалить из корзины
      const updatedCart = cart.filter((item) => item.id !== product.id);
      updateCartInLocalStorage(updatedCart);
      setIsInCart(false);
      setQuantity(1); // Сброс количества после удаления
    } else {
      // Добавить в корзину
      const newCartItem = {
        id: product.id,
        quantity,
        name: product.name,
        price: product.price
      };
      updateCartInLocalStorage([...cart, newCartItem]);
      setIsInCart(true);
    }
  };

  // if (isLoading) return <p>Загрузка...</p>;
  // if (!isSuccess) return <p>Не удалось загрузить информацию о продукте</p>;

  return (
    <div>
      <div className='container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Левая часть - Галерея изображений */}
        <div className='flex flex-col items-center'>
          <div className='w-3/4 mb-6'>
            {/* Главное изображение */}
            <Image
              src={JSON.parse(product.images)[0].url || '/placeholder-image.jpg'}
              alt={product.name}
              width={400}
              height={400}
              className='rounded-lg object-contain'
              quality={100}
            />
          </div>
          {/* Превью изображений */}
          <div className='flex space-x-2'>
            {JSON.parse(product.images)
              .slice(1)
              .map(({url}, index) => (
                <Dialog>
                  <DialogTrigger>
                    {' '}
                    <Image
                      key={index}
                      src={url}
                      alt={`Product preview ${index + 1}`}
                      width={60}
                      height={60}
                      className='cursor-pointer rounded-lg border border-gray-200'
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <Image
                      key={index}
                      src={url}
                      alt={`Product preview ${index + 1}`}
                      width={1000}
                      height={1000}
                      quality={100}
                      className='cursor-pointer rounded-lg'
                    />
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>

        {/* Правая часть - Информация о товаре */}
        <div className='flex flex-col space-y-4'>
          {/* Название и цена */}
          <h1 className='text-3xl font-semibold'>{product.name}</h1>
          <p className='text-xl text-gray-600'>₽ {Number(product.price).toFixed(2)}</p>

          {/* Рейтинг
          <div className='flex items-center'>
            <div className='flex space-x-1 text-yellow-500'>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <span key={index}>&#9733;</span> // Иконка звезды
              ))}
            </div>
            <p className='ml-2 text-sm text-gray-500'>5 отзывов</p>
          </div> */}

          {/* Описание товара */}
          <p className='text-gray-700'>{product.description}</p>

          {/* Кнопки "Добавить в корзину" и управление количеством */}
          <div className='flex space-x-4 items-center'>
            <div className='h-[36px] flex items-center border border-gray-300 rounded-md px-3 py-0'>
              <button onClick={() => handleQuantityChange(-1)} className='text-lg'>
                -
              </button>
              <span className='mx-4'>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className='text-lg'>
                +
              </button>
            </div>
            <Button onClick={handleCartUpdate} className='px-6 py-2 rounded-md'>
              {isInCart ? 'Удалить из корзины' : 'В корзину'}
            </Button>
          </div>

          {/* Информация о товаре */}
          <div className='mt-4 space-y-1 text-sm text-gray-600'>
            <p>
              <strong>Артикул:</strong> {product.id || 'N/A'}
            </p>
            <p>
              <strong>Категория:</strong> {product.category || 'Не указана'}
            </p>
            <p>
              <strong>Теги:</strong> {product.tags || 'Не указаны'}
            </p>
          </div>
        </div>

        {/* Описание, Дополнительная информация */}
        <div className='col-span-1 md:col-span-2 mt-10 border-t pt-8'>
          <div className='flex justify-between'>
            <button className='text-lg font-semibold border-b-2 border-primary px-4'>Описание</button>
          </div>
          <div className='mt-6 text-gray-700'>{parse(product.detailed_description)}</div>
        </div>
      </div>
    </div>
  );
};
