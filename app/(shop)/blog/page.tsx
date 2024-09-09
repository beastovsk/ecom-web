import {Metadata} from 'next';
import Article from '@/modules/shop/Article/Article';
import React from 'react';
import Blog from '@/modules/shop/Blog/Blog';

export const dynamic = 'force-dynamic';

async function getBlogById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/getBlogById/${id}`, {
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
export async function generateMetadata({searchParams}: {searchParams?: {article: string}}): Promise<Metadata> {
  if (!searchParams.article) return;

  const blog = await getBlogById(searchParams.article);

  if (!blog) {
    // Fallback metadata if the blog data is unavailable
    return {
      title: 'Блог не найден',
      description: 'Статья которую вы искали, возможно удалена'
    };
  }

  const images = blog.images ? [JSON.parse(blog.images)] : [];

  return {
    title: blog.title, // Article title
    description: blog.content.slice(0, 150), // First 150 characters of content as description
    keywords: blog.tags, // Keywords from tags
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
      datePublished: new Date().toISOString() // Set the actual publication date
    }
  };
}
export default async function Page({searchParams}: {searchParams?: {article: string}}) {
  const blog = await getBlogById(searchParams.article);

  if (!blog) {
    return (
      <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <Blog />
      </div>
    );
  }

  return <Article blog={blog} />;
}
