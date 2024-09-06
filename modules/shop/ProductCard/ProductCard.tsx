import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useState, useEffect} from 'react';

export const ProductCard = ({product}) => {
  const [cart, setCart] = useState([]);
  const {id, images, name, price} = product;
  const isInCart = cart.some((item) => item.id === id);

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
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
    } else {
      const updatedCart = [...cart, {...product, quantity: 1}];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const handleQuantityChange = (id, delta) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? {...item, quantity: Math.max(1, item.quantity + delta)} : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className='flex flex-col items-center border p-4 rounded-lg shadow-md'>
      <Link href={`/products/${id}`} className='w-full'>
        <div
          className='bg-gray-300 h-72 rounded-xl w-full mb-4'
          style={{
            backgroundImage: `url(${JSON.parse(images)[0].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <h3 className='text-lg font-semibold'>{name}</h3>
        <p className='font-semibold opacity-70'>{price.toLocaleString()} ₽</p>
      </Link>
      {isInCart ? (
        <div className='w-full mt-4'>
          <div className='flex gap-5 items-center justify-between mb-2'>
            <div className='h-[36px] flex items-center border border-gray-300 rounded-md px-3 py-0'>
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
        <Button variant='secondary' className='mt-3 w-full' onClick={() => handleCartToggle(product)}>
          В корзину
        </Button>
      )}
    </div>
  );
};
