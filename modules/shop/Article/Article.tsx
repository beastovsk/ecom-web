import React from 'react';
import {useRouter} from 'next/navigation';

type Post = {
  id: number;
  title: string;
  date: string;
  category: string;
  content: string;
  image: string;
};

const posts: Post[] = [
  {
    id: 1,
    title: 'Going all-in with millennial design',
    date: '14 Oct 2022',
    category: 'Wood',
    content: 'Full content of the article...',
    image: '/images/post1.jpg'
  },
  {
    id: 2,
    title: 'Exploring new ways of decorating',
    date: '14 Oct 2022',
    category: 'Handmade',
    content: 'Full content of the article...',
    image: '/images/post2.jpg'
  }
];

const Article: React.FC = () => {
  const post = posts[0];

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className=' mx-auto shadow-md rounded-lg overflow-hidden'>
        <img src={post.image} alt={post.title} className='w-full h-64 object-cover' />
        <div className='p-6'>
          <div className='flex justify-between items-center text-gray-500 text-sm mb-4'>
            <span>{post.date}</span>
            <span>{post.category}</span>
          </div>
          <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
          <p className='text-gray-700 leading-relaxed'>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Article;
