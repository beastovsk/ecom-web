'use client';
import {getBanners} from '@/data/api/banner';
import Image from 'next/image';
import {useQuery} from 'react-query';
import {Carousel} from 'antd';

export const Banner = () => {
  const {data} = useQuery('banners', getBanners);

  if (!data || data.banners.length === 0) {
    return <div className='w-full h-[50vh] bg-gray-200'></div>;
  }

  return (
    <div className='w-full h-[50vh] mt-4'>
      <Carousel autoplay effect='fade'>
        {data.banners.map((banner, index) => {
          const imageUrl = banner.img || '/images/default.jpg'; // Получаем URL из JSON-строки
          return (
            <div key={index} className='w-full h-[50vh]'>
              <Image
                src={imageUrl}
                alt={`Banner ${index + 1}`}
                width={1000}
                height={800}
                quality={100}
                className='w-full h-[50vh] object-cover'
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
