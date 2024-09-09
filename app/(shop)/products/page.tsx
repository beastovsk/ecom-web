import {ProductDetails} from '@/modules/products/ProductDetails/ProductDetails';
import {Products} from '@/modules/products/Products/Products';
import {Metadata} from 'next';
import React from 'react';

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
  if (!searchParams.id) return;

  const productData = await getProductById(searchParams.id);

  if (!productData) {
    // Fallback metadata if the product data is unavailable
    return {
      title: 'Список продуктов',
      description: 'Список продуктов магазина'
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
    title: product.name, // Product title
    description: product.description, // Product description
    openGraph: {
      title: product.name,
      description: product.description,
      images
    },
    // @ts-ignore
    additionalMetaTags: [
      {
        name: 'price',
        content: product.price.toString() // Product price
      }
    ],
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images
    },
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: images[0]?.url,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'RUB' // Replace with the appropriate currency
      }
    }
  };
}

export default async function Page({searchParams}: {searchParams?: {id: string}}) {
  const productData = await getProductById(searchParams.id);

  if (!productData) {
    return (
      <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <Products />
      </div>
    );
  }

  const {product} = productData;

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      {/* Pass product data to the ProductDetails component */}
      <ProductDetails product={product} />
    </div>
  );
}
