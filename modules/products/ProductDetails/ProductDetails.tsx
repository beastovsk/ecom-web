import {Button} from '@/components/ui/button';
import Image from 'next/image';

export const ProductDetails = ({id}) => {
  return (
    <div>
      <div className='container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Левая часть - Галерея изображений */}
        <div className='flex flex-col items-center'>
          <div className='w-3/4 mb-6'>
            {/* Главное изображение */}
            <Image src='/path/to/main-image.jpg' alt='Asgaard sofa' width={400} height={400} className='rounded-lg' />
          </div>
          {/* Превью изображений */}
          <div className='flex space-x-2'>
            {[1, 2, 3, 4].map((_, index) => (
              <Image
                key={index}
                src={`/path/to/image${index + 1}.jpg`}
                alt='Product preview'
                width={60}
                height={60}
                className='cursor-pointer rounded-lg border border-gray-200'
              />
            ))}
          </div>
        </div>

        {/* Правая часть - Информация о товаре */}
        <div className='flex flex-col space-y-4'>
          {/* Название и цена */}
          <h1 className='text-3xl font-semibold'>Asgaard sofa</h1>
          <p className='text-xl text-gray-600'>Rs. 250,000.00</p>

          {/* Рейтинг */}
          <div className='flex items-center'>
            <div className='flex space-x-1 text-yellow-500'>
              {/* Используйте иконки звезд, например, из Lucide */}
              {[1, 2, 3, 4, 5].map((_, index) => (
                <span key={index}>&#9733;</span> // Иконка звезды
              ))}
            </div>
            <p className='ml-2 text-sm text-gray-500'>5 Customer Review</p>
          </div>

          {/* Описание товара */}
          <p className='text-gray-700'>
            Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero
            with a well-balanced audio which boasts a clear midrange and extended highs for a sound.
          </p>

          {/* Кнопки "Добавить в корзину" и "Сравнить" */}
          <div className='flex space-x-4'>
            <div className='flex items-center border border-gray-300 rounded-md px-3 py-0'>
              <button className='text-lg'>-</button>
              <span className='mx-4'>1</span>
              <button className='text-lg'>+</button>
            </div>
            <Button className='px-6 py-2 rounded-md'>Add To Cart</Button>
          </div>

          {/* Информация о товаре */}
          <div className='mt-4 space-y-1 text-sm text-gray-600'>
            <p>
              <strong>SKU:</strong> SS001
            </p>
            <p>
              <strong>Category:</strong> Sofas
            </p>
            <p>
              <strong>Tags:</strong> Sofa, Chair, Home, Shop
            </p>
          </div>
        </div>

        {/* Описание, Дополнительная информация */}
        <div className='col-span-1 md:col-span-2 mt-10 border-t pt-8'>
          <div className='flex justify-between'>
            <button className='text-lg font-semibold border-b-2 border-primary px-4'>Description</button>
          </div>
          <div className='mt-6 text-gray-700'>
            <p>
              Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the
              unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.
            </p>
            <p className='mt-4'>
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage-styled engineering. The analogue
              knobs allow you to fine-tune the controls to your personal preferences while the guitar-influenced leather
              strap enables easy and stylish travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
