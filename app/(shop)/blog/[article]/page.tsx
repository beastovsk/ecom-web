import {Metadata} from 'next';
import Article from '@/modules/shop/Article/Article';
import React from 'react';

// Функция для получения данных статьи с сервера по ID
async function getBlogById(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/getBlogById/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store' // Не кэшировать запрос на стороне сервера
  });

  console.log(id);

  if (!response.ok) {
    throw new Error('Failed to fetch blog data');
  }

  const data = await response.json();
  return data;
}

// Генерация метаданных для SEO на основе данных статьи
export async function generateMetadata({params}: {params: {article: string}}): Promise<Metadata> {
  const blog = await getBlogById(params.article);
  const images = [JSON.parse(blog.images)];
  return {
    title: blog.title, // Заголовок статьи
    description: blog.content.slice(0, 150), // Первые 150 символов контента как описание
    keywords: blog.tags, // Ключевые слова из тэгов
    openGraph: {
      title: blog.title,
      description: blog.content.slice(0, 150),
      images
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.content.slice(0, 150),
      images
    },
    // @ts-ignore
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blog.title,
      description: blog.content.slice(0, 150),
      images,
      keywords: blog.tags,
      datePublished: new Date().toISOString() // Установите фактическую дату публикации
    }
  };
}

// Серверная компонента страницы
export default async function Page({params}: {params: {article: string}}) {
  const blog = await getBlogById(params.article);

  return <Article blog={blog} />;
}
