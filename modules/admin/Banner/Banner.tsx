'use client';

import {useQuery, useMutation, useQueryClient} from 'react-query';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Upload, UploadFile} from 'antd'; // For handling file upload
import {getBanners, createBanner, deleteBanner} from '@/data/api/banner'; // Banner API functions
import {useToast} from '@/components/ui/use-toast'; // Import useToast for notifications

export const Banner: React.FC = () => {
  const queryClient = useQueryClient();
  const {toast} = useToast(); // Initialize toast for notifications

  // State for form data
  const [formState, setFormState] = useState({
    name: '',
    img: '' // Base64 image data
  });

  const [editState, setEditState] = useState<{
    id: number;
    name: string;
    img: string; // Base64 image data or parsed URL from JSON
  } | null>(null);

  // Fetch banners
  const {data, isLoading, error, refetch} = useQuery('banners', getBanners);

  // Mutation for creating a new banner
  const mutationCreate = useMutation(createBanner, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('banners');
      setFormState({name: '', img: ''}); // Clear form state after successful creation
      refetch();
      toast({title: 'Баннер добавлен', description: response.message}); // Success notification
    },
    onError: () => {
      toast({title: 'Ошибка', description: 'Не удалось добавить баннер'}); // Error notification
    }
  });

  // Mutation for deleting a banner
  const mutationDelete = useMutation(deleteBanner, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('banners');
      refetch();
      toast({title: 'Баннер удален', description: response.message}); // Success notification
    },
    onError: () => {
      toast({title: 'Ошибка', description: 'Не удалось удалить баннер'}); // Error notification
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
            setEditState((prevState) => (prevState ? {...prevState, image: reader.result as string} : null));
          } else {
            setFormState((prevState) => ({
              ...prevState,
              img: reader.result as string
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle form submission for creating banner
  const handleCreateBanner = async (event: React.FormEvent) => {
    event.preventDefault();
    mutationCreate.mutate(formState);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Ошибка</p>;

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Баннеры</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название баннера</th>
              <th className='text-left p-2'>Изображение</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.banners?.map((banner) => {
              const imageUrl = banner.img || '/images/default.jpg'; // Parse JSON to get the URL
              return (
                <tr key={banner.id}>
                  <td className='p-2'>{banner.name}</td>
                  <td className='p-2'>
                    <img src={imageUrl} alt={banner.name} className='w-32' />
                  </td>
                  <td className='p-2'>
                    <Dialog>
                      <DialogTrigger>
                        <button className='text-red-500 hover:underline mr-4'>Удалить</button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Удалить?</DialogTitle>
                        <DialogFooter>
                          <Button variant='destructive' onClick={() => mutationDelete.mutate(banner.id)}>
                            Подтвердить
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className='mt-4'>
          <h2 className='text-xl font-semibold mb-2'>Добавить новый баннер</h2>
          <form onSubmit={handleCreateBanner}>
            <Input
              name='name'
              type='text'
              placeholder='Название баннера'
              value={formState.name}
              onChange={handleChange}
              className='border p-2 w-full mb-4'
              required
            />
            <div>
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
              {formState.img && <img src={formState.img} alt='Selected' className='w-32 mb-4' />}
            </div>
            <Button type='submit' className='px-4 py-2 rounded-md'>
              Сохранить
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
