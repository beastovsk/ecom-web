import {Filter} from '@/modules/products/Filter/Filter';
import {Products} from '@/modules/products/Products/Products';
import React from 'react';

export default async function Page() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <Products />
    </div>
  );
}
