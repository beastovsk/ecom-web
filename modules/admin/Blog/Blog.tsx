'use client';

import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useState} from 'react';
import {CustomEditor} from '@/components/CustomEditor';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Upload, UploadFile} from 'antd';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {getAllBlogs, createBlog, deleteBlog, updateBlog} from '@/data/api/blog'; // Добавляем updateBlog

export const Blog: React.FC = () => {
  const queryClient = useQueryClient();

  // State for form data
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    images: '', // Base64 image data
    tags: '' // New field for tags
  });

  const [editState, setEditState] = useState<{
    id: number;
    title: string;
    content: string;
    images: string; // Base64 image data or parsed URL from JSON
    tags: string;
  } | null>(null);

  // Fetch blogs
  const {data, isLoading, error} = useQuery('blogs', getAllBlogs);

  // Mutation for creating a new blog
  const mutationCreate = useMutation(createBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
      // Clear form state after successful creation
      setFormState({title: '', content: '', images: '', tags: ''});
    }
  });

  // Mutation for updating a blog
  const mutationUpdate = useMutation(
    ({id, ...rest}: {id: number; title: string; content: string; images: string; tags: string}) => updateBlog(id, rest),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs');
        setEditState(null);
      }
    }
  );

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

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setEditState((prevState) => (prevState ? {...prevState, [name]: value} : null));
  };

  // Handle image upload change
  const handleImageChange = (info: {fileList: UploadFile[]}, isEdit = false) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (isEdit) {
            setEditState((prevState) => (prevState ? {...prevState, images: reader.result as string} : null));
          } else {
            setFormState((prevState) => ({
              ...prevState,
              images: reader.result as string
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle form submission for creating blog
  const handleCreateBlog = async (event: React.FormEvent) => {
    event.preventDefault();
    mutationCreate.mutate({...formState});
  };

  // Handle form submission for updating blog
  const handleUpdateBlog = async () => {
    if (editState) {
      mutationUpdate.mutate({
        id: editState.id,
        title: editState.title,
        content: editState.content,
        images: editState.images,
        tags: editState.tags
      });
    }
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
            {data?.blogs?.map((blog) => {
              const imageUrl = JSON.parse(blog.images)?.url || '/images/default.jpg'; // Parse JSON to get the URL
              return (
                <tr key={blog.id}>
                  <td className='p-2'>{blog.title}</td>
                  <td className='p-2'>
                    <img src={imageUrl} alt={blog.title} className='w-32' />
                  </td>
                  <td className='p-2'>
                    <Dialog>
                      <DialogTrigger>
                        <button
                          className='text-blue-600 hover:underline mr-4'
                          onClick={() =>
                            setEditState({
                              id: blog.id,
                              title: blog.title,
                              content: blog.content,
                              images: imageUrl,
                              tags: blog.tags
                            })
                          }
                        >
                          Изменить
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Изменить статью</DialogTitle>
                        <Input
                          type='text'
                          placeholder='Название поста'
                          name='title'
                          value={editState?.title || ''}
                          onChange={handleEditChange}
                          className='border p-2 w-full mb-4'
                        />
                        <Input
                          type='text'
                          placeholder='Теги (через запятую)'
                          name='tags'
                          value={editState?.tags || ''}
                          onChange={handleEditChange}
                          className='border p-2 w-full mb-4'
                        />
                        <CustomEditor
                          getValue={(content) =>
                            setEditState((prevState) => (prevState ? {...prevState, content} : null))
                          }
                          propsValue={editState?.content || ''}
                        />
                        <div className='mt-10'>
                          <Upload
                            customRequest={() => {}}
                            onChange={(info) => handleImageChange(info, true)}
                            showUploadList={false}
                            accept='image/*'
                          >
                            <Button type='button' className='mb-4'>
                              Загрузить изображение
                            </Button>
                          </Upload>
                        </div>
                        {editState?.images && <img src={editState.images} alt='Selected' className='w-32 mb-4' />}
                        <DialogFooter>
                          <Button className='mt-10' onClick={handleUpdateBlog}>
                            Сохранить
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <button className='text-red-600 hover:underline' onClick={() => mutationDelete.mutate(blog.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              );
            })}
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
            <Input
              name='tags'
              type='text'
              placeholder='Теги (через запятую)'
              value={formState.tags}
              onChange={handleChange}
              className='border p-2 w-full mb-4'
              required
            />
            <CustomEditor getValue={(content) => setFormState((prevState) => ({...prevState, content}))} />
            <div className='mt-5'>
              <Upload
                customRequest={() => {}}
                onChange={(info) => handleImageChange(info)}
                showUploadList={false}
                accept='image/*'
              >
                <Button type='button' className='mb-4'>
                  Загрузить изображение
                </Button>
              </Upload>
            </div>
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
