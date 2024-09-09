import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useCartStore} from '@/data/store/store';
import Link from 'next/link';
import {useState, useEffect} from 'react';

export const ProductCard = ({product}) => {
  const [cart, setCart] = useState([]);
  const {id, images, name, price} = product;
  const isInCart = cart.some((item) => item.id === id);
  const {toast} = useToast();
  const {totalQuantity, updateQuantity} = useCartStore();

  // Инициализация корзины из localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []); // Empty dependency array to run only on mount

  const handleCartToggle = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart((prevCart) => {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
        const totalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateQuantity(totalQuantity); // Обновляем количество в store
        toast({title: 'Добавление товара', description: 'Количество товара в корзине изменено'});
        return updatedCart;
      });
    } else {
      const updatedCart = [...cart, {...product, quantity: 1}];
      setCart(updatedCart);
      const totalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateQuantity(totalQuantity); // Обновляем количество в store
      toast({title: 'Добавление товара', description: 'Товар добавлен в корзину'});
    }
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? {...item, quantity: Math.max(1, item.quantity + delta)} : item
      );
      const totalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateQuantity(totalQuantity); // Обновляем количество в store
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      const totalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateQuantity(totalQuantity); // Обновляем количество в store
      toast({title: 'Удаление товара', description: 'Товар удален из корзины'});
      return updatedCart;
    });
  };

  return (
    <div className='flex flex-col justify-between items-center border p-4 rounded-lg shadow-md max-w-sm w-full h-full'>
      <Link href={`/products?id=${id}`} className='w-full flex-1 flex flex-col'>
        <div className='w-full aspect-w-1 aspect-h-1 rounded-xl mb-4 overflow-hidden'>
          <img src={JSON.parse(images)[0].url} alt={name} className='object-cover w-full h-full' />
        </div>
        <h3 className='text-lg font-semibold line-clamp-2 h-[52px] overflow-hidden'>{name}</h3>
        <p className='font-semibold opacity-70 my-4'>{price.toLocaleString()} ₽</p>
      </Link>
      {isInCart ? (
        <div className='w-full mt-4'>
          <div className='flex flex-col gap-2 items-center justify-between mb-2'>
            <div className='flex w-full justify-between items-center border border-gray-300 rounded-md px-3 py-1'>
              <button onClick={() => handleQuantityChange(id, -1)} className='text-lg px-2'>
                -
              </button>
              <span className='mx-3'>{cart.find((item) => item.id === id)?.quantity || 1}</span>
              <button onClick={() => handleQuantityChange(id, 1)} className='text-lg px-2'>
                +
              </button>
            </div>
            <Button variant='destructive' onClick={() => handleRemoveFromCart(id)} className='w-full'>
              Удалить
            </Button>
          </div>
        </div>
      ) : (
        <Button variant='secondary' className='mt-auto w-full' onClick={() => handleCartToggle(product)}>
          В корзину
        </Button>
      )}
    </div>
  );
};
