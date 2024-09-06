import {ScrollArea} from '@/components/ui/scroll-area';
import {ShopInfo} from '@/modules/admin/ShopInfo/ShopInfo';
import {Banner} from '@/modules/shop/Banner/Banner';
import {Categories} from '@/modules/shop/Categories/Categories';
import {Products} from '@/modules/shop/Products/Products';
import React from 'react';

export default async function Page() {
  return (
    <div className='flex w-full flex-col'>
      <ShopInfo />
    </div>
  );
}
