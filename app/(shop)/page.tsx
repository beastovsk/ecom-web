import {Banner} from '@/modules/shop/Banner/Banner';
import {Categories} from '@/modules/shop/Categories/Categories';
import {Products} from '@/modules/shop/Products/Products';
import React from 'react';

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/getCategories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Avoid caching the request on the server side
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getBlogById:', error);
    return null; // Return null or handle error appropriately
  }
}
async function getProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getAllProducts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Avoid caching the request on the server side
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getBlogById:', error);
    return null; // Return null or handle error appropriately
  }
}

export default async function Page() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <div className='flex w-full flex-col'>
      <Banner />
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <Categories categories={categories} />
        <Products products={products} />
      </main>
    </div>
  );
}
