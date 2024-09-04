import React from 'react';
import Image from 'next/image';
import htmlParser from 'html-react-parser'; // Для безопасного рендеринга HTML контента

const Article = ({blog}) => {
  // Парсим изображения из строки JSON
  const parsedImage = JSON.parse(blog.images);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Карточка статьи */}
      <div className='mx-auto shadow-md rounded-lg overflow-hidden'>
        {/* Изображение статьи */}
        <Image
          src={parsedImage.url}
          alt={blog.title}
          width={800}
          height={400}
          className='w-full h-[50vh] object-cover'
        />
        {/* Контент статьи */}
        <div className='p-6'>
          <h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
          {/* Безопасно рендерим HTML контент статьи */}
          <div className='text-gray-700 leading-relaxed mb-4'>{htmlParser(blog.content)}</div>
          {/* Теги статьи */}
          <div className='text-gray-500 text-sm'>
            <strong>Теги: </strong>
            {blog.tags.split(',').map((tag, index) => (
              <span key={index} className='inline-block mr-2'>
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
