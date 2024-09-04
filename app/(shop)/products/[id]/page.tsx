import {Metadata} from 'next';
import {Filter} from '@/modules/products/Filter/Filter';
import {ProductDetails} from '@/modules/products/ProductDetails/ProductDetails';
import {Products} from '@/modules/products/Products/Products';
import React from 'react';

// Функция для получения данных продукта с сервера
async function getProductById(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/getProductById/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // Это нужно для того, чтобы не кэшировать запрос на стороне сервера
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }

  const data = await response.json();
  return data;
}

// Генерация метаданных для SEO на основе данных продукта
export async function generateMetadata({params}: {params: {id: string}}): Promise<Metadata> {
  const {product} = await getProductById(params.id);
  const images = JSON.parse(product.images).map(({url}) => ({url, width: 800, height: 600, alt: product.name}));
  return {
    title: product.name, // Название продукта
    description: product.description, // Описание продукта
    openGraph: {
      title: product.name,
      description: product.description,
      images
    },
    // @ts-ignore
    additionalMetaTags: [
      {
        name: 'price',
        content: product.price.toString() // Цена продукта
      }
    ],
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images
    },
    jsonLd: {
      '@type': 'Продукт',
      name: product.name,
      description: product.description,
      image: images[0].url,
      offers: {
        '@type': 'Предложение',
        price: product.price,
        priceCurrency: 'RUB' // Замените на нужную валюту
      }
    }
  };
}

// Серверная компонента страницы
export default async function Page({params}: {params: {id: string}}) {
  // Получаем данные продукта
  const {product} = await getProductById(params.id);
  console.log(product);
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      {/* Передаем данные продукта в компонент ProductDetails */}
      <ProductDetails product={product} />
    </div>
  );
}
