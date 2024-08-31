import React from 'react';
import Link from 'next/link';

type Post = {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: 'Going all-in with millennial design',
    date: '14 Oct 2022',
    category: 'Wood',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: '/images/post1.jpg'
  },
  {
    id: 2,
    title: 'Exploring new ways of decorating',
    date: '14 Oct 2022',
    category: 'Handmade',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    image: '/images/post2.jpg'
  }
];

const Blog: React.FC = () => {
  return (
    <div className='container mx-auto px-4'>
      <div className='grid md:grid-cols-2 gap-8'>
        {posts.map((post) => (
          <div key={post.id} className='shadow-md rounded-lg overflow-hidden'>
            <img src={post.image} alt={post.title} className='w-full h-48 object-cover' />
            <div className='p-6'>
              <div className='flex justify-between items-center text-gray-500 text-sm mb-2'>
                <span>{post.date}</span>
                <span>{post.category}</span>
              </div>
              <h2 className='text-2xl font-bold mb-2'>
                <Link href={`/article/${post.id}`}>{post.title}</Link>
              </h2>
              <p className='text-gray-700 mb-4'>{post.description}</p>
              <Link href={`/article/${post.id}`} className='text-blue-600 hover:underline'>
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Categories</h3>
        <ul className='text-gray-700'>
          <li>Crafts (2)</li>
          <li>Design (8)</li>
          <li>Handmade (7)</li>
          <li>Interior (1)</li>
          <li>Wood (6)</li>
        </ul>
      </div>
      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>Recent Posts</h3>
        <ul className='space-y-4'>
          {posts.map((post) => (
            <li key={post.id} className='flex items-center'>
              <img src={post.image} alt={post.title} className='w-16 h-16 object-cover rounded-md mr-4' />
              <Link href={`/article/${post.id}`} className='text-blue-600 hover:underline'>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
