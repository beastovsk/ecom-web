import {Metadata} from 'next';
import Article from '@/modules/shop/Article/Article';
import React from 'react';

async function getBlogById(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/getBlogById/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store' // Avoid caching the request on the server side
    });

    console.log(`Fetching blog data for ID: ${id}`);

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
export async function generateMetadata({params}: {params: {article: string}}): Promise<Metadata> {
  const blog = await getBlogById(params.article);

  if (!blog) {
    // Fallback metadata if the blog data is unavailable
    return {
      title: 'Blog not found',
      description: 'The blog post you are looking for does not exist.'
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
export default async function Page({params}: {params: {article: string}}) {
  const blog = await getBlogById(params.article);

  if (!blog) {
    return <div>Blog post not found</div>; // Handle the case when the blog is not found
  }

  return <Article blog={blog} />;
}
