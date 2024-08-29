'use client';
import {useSearchParams} from 'next/navigation';
import {Filter} from '../Filter/Filter';
import {ProductDetails} from '../ProductDetails/ProductDetails';

export const Products = () => {
  const search = useSearchParams();
  const id = search.get('id');
  if (id) {
    return <ProductDetails id={id} />;
  }

  return <Filter />;
};
