import {Banner} from '@/modules/shop/Banner/Banner';
import {Categories} from '@/modules/shop/Categories/Categories';
import {Products} from '@/modules/shop/Products/Products';
import React from 'react';

export default function Page() {
  return (
    <div className='flex w-full flex-col'>
      <Banner />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
          <Categories />
          <Products />
      </main>
    </div>
  );
}
