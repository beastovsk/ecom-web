'use client';

import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useState} from 'react';
import {CustomEditor} from '@/components/CustomEditor';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Upload, UploadFile} from 'antd';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {getAllBlogs, createBlog, deleteBlog} from '@/data/api/blog';

export const Blog: React.FC = () => {
  const queryClient = useQueryClient();

  // State for form data
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    images: '' // Base64 image data
  });

  // Fetch blogs
  const {data, isLoading, error} = useQuery('blogs', getAllBlogs);

  // Mutation for creating a new blog
  const mutationCreate = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      // Clear form state after successful creation
      setFormState({title: '', content: '', images: ''});
    }
  });

  // Mutation for deleting a blog
  const mutationDelete = useMutation(deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  });

  // Handle form state change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormState((prevState) => ({...prevState, [name]: value}));
  };

  // Handle image upload change
  const handleImageChange = (info: {fileList: UploadFile[]}) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormState((prevState) => ({
            ...prevState,
            images: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle form submission
  const handleCreateBlog = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
    // Use formState to create blog
    mutationCreate.mutate({...formState});
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching blogs: {error.message}</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Блог</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название статьи</th>
              <th className='text-left p-2'>Изображение</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.blogs?.map((blog) => (
              <tr key={blog.id}>
                <td className='p-2'>{blog.title}</td>
                <td className='p-2'>
                  <img src={blog.images?.url || '/images/default.jpg'} alt={blog.title} className='w-32' />
                </td>
                <td className='p-2'>
                  <Dialog>
                    <DialogTrigger>
                      <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Изменить статью</DialogTitle>
                      <Input
                        type='text'
                        placeholder='Название поста'
                        defaultValue={blog.title}
                        className='border p-2 w-full mb-4'
                      />
                      <CustomEditor getValue={(content) => content} />
                      <DialogFooter>
                        <Button className='mt-10'>Сохранить</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <button className='text-red-600 hover:underline' onClick={() => mutationDelete.mutate(blog.id)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новую статью</h2>
          <form onSubmit={handleCreateBlog}>
            <Input
              name='title'
              type='text'
              placeholder='Название поста'
              value={formState.title}
              onChange={handleChange}
              className='border p-2 w-full mb-4'
              required
            />
            <CustomEditor getValue={(content) => setFormState((prevState) => ({...prevState, content}))} />
            <Upload customRequest={() => {}} onChange={handleImageChange} showUploadList={false} accept='image/*'>
              <Button type='button' className='mb-4'>
                Загрузить изображение
              </Button>
            </Upload>
            {formState.images && <img src={formState.images} alt='Selected' className='w-32 mb-4' />}
            <Button type='submit' className='px-4 py-4 mt-2 rounded-md'>
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
