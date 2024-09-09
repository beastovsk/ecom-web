import {ProductDetails} from '@/modules/products/ProductDetails/ProductDetails';
import {Products} from '@/modules/products/Products/Products';
import {Metadata} from 'next';
import React from 'react';

// Ensure the page is rendered dynamically
// export const dynamic = 'force-dynamic';

async function getProductById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getProductById/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Prevent caching of the request on the server side
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null; // Return null or handle error appropriately
  }
}

export async function generateMetadata({searchParams}: {searchParams?: {id: string}}): Promise<Metadata> {
  if (!searchParams || !searchParams.id) {
    return {
      title: 'Product List',
      description: 'List of products in the shop'
    };
  }

  const productData = await getProductById(searchParams.id);

  if (!productData) {
    return {
      title: 'Product List',
      description: 'List of products in the shop'
    };
  }

  const {product} = productData;
  const images = JSON.parse(product.images).map(({url}) => ({
    url,
    width: 800,
    height: 600,
    alt: product.name
  }));

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images
    }
  };
}

interface PageProps {
  searchParams: {id: string};
}

export default async function Page({searchParams}: PageProps) {
  const productData = searchParams.id ? await getProductById(searchParams.id) : null;

  if (!productData || !productData.product) {
    return (
      <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <Products />
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <ProductDetails product={productData.product} />
    </div>
  );
}
