import Blog from '@/modules/shop/Blog/Blog';
import {Cart} from '@/modules/shop/Cart/Cart';
import React from 'react';

export default async function Page() {
  return <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'><Blog/></div>;
}
