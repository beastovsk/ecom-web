'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {deleteProduct, getAllProducts, updateProduct, createProduct} from '@/data/api/products';
import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {Dialog, DialogTrigger, DialogContent} from '@/components/ui/dialog';
import {Plus} from 'lucide-react';
import {CustomEditor} from '@/components/CustomEditor';
import {Upload, UploadFile, UploadProps} from 'antd';
import {getCategories} from '@/data/api/categories';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {useToast} from '@/components/ui/use-toast'; // Adjust import as necessary

type FileType = Parameters<UploadProps['beforeUpload']>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const Products: React.FC = () => {
  const {data, refetch} = useQuery('products', getAllProducts);
  const {data: categories} = useQuery('categories', getCategories);
  const {toast} = useToast(); // Using custom toast hook

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      refetch();
      toast({title: 'Успех!', description: 'Продукт успешно удален!'});
    },
    onError: () => {
      toast({title: 'Ошибка!', description: 'Не удалось удалить продукт.'});
    }
  });

  const updateMutation = useMutation(updateProduct, {
    onSuccess: () => {
      refetch();
      toast({title: 'Успех!', description: 'Продукт успешно обновлен!'});
    },
    onError: () => {
      toast({title: 'Ошибка!', description: 'Не удалось обновить продукт.'});
    }
  });

  const createMutation = useMutation(createProduct, {
    onSuccess: () => {
      refetch();
      toast({title: 'Успех!', description: 'Продукт успешно добавлен!'});
    },
    onError: () => {
      toast({title: 'Ошибка!', description: 'Не удалось добавить продукт.'});
    }
  });

  const handleDelete = (productId: number) => {
    deleteMutation.mutate({id: productId});
  };

  const handleUpdate = (product: any) => {
    updateMutation.mutate(product);
  };

  const handleCreate = (product: any) => {
    createMutation.mutate(product);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Продукты</h1>

      {/* Таблица продуктов */}
      <div className='p-4 shadow-md rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left p-2'>Название</th>
              <th className='text-left p-2'>Цена</th>
              <th className='text-left p-2'>Категория</th>
              <th className='text-left p-2'>Действия</th>
            </tr>
          </thead>
          <tbody>
            {data?.products?.map((product) => (
              <tr key={product.id}>
                <td className='p-2'>{product.name}</td>
                <td className='p-2'>{product.price} руб.</td>
                <td className='p-2'>{product.category}</td>
                <td className='p-2'>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className='text-blue-600 hover:underline mr-4'>Изменить</button>
                    </DialogTrigger>
                    <DialogContent>
                      <ProductForm initialData={product} onSubmit={(data) => handleUpdate({...data, id: product.id})} />
                    </DialogContent>
                  </Dialog>
                  <button onClick={() => handleDelete(product.id)} className='text-red-600 hover:underline'>
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Кнопка для добавления нового продукта */}
      <div className='mt-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='flex items-center space-x-2'>
              <Plus className='mr-2' /> <span>Добавить продукт</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ProductForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

// Компонент формы продукта
const ProductForm: React.FC<{initialData?: any; onSubmit: (data: any) => void}> = ({
  initialData = {name: '', description: '', detailed_description: '', price: '', tags: '', category: '', images: ''},
  onSubmit
}) => {
  const [productData, setProductData] = useState(initialData);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {data: categories} = useQuery('categories', getCategories);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (value: string) => {
    setProductData({
      ...productData,
      category: value
    });
  };

  useEffect(() => {
    if (!initialData.images) return;
    try {
      const images = JSON.parse(initialData.images);
      setFileList(images.map(({url}) => ({thumbUrl: url})));
    } catch (error) {
      console.error('Failed to parse images:', error);
    }
  }, [initialData]);

  const handleEditorChange = (value: string) => {
    setProductData({...productData, detailed_description: value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...productData, images: fileList.map(({thumbUrl}) => thumbUrl)});
  };

  const handleUploadChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <button style={{border: 0, background: 'none'}} type='button'>
      <div style={{marginTop: 8}}>Загрузить</div>
    </button>
  );

  return (
    <div>
      <p className='mb-2'>Название</p>
      <Input
        type='text'
        name='name'
        value={productData.name}
        onChange={handleChange}
        placeholder='Название продукта'
        className='border p-2 w-full mb-4'
      />
      <p className='mb-2'>Цена</p>
      <Input
        type='text'
        name='price'
        value={productData.price}
        onChange={handleChange}
        placeholder='Цена'
        className='border p-2 w-full mb-4'
      />
      <p className='mb-2'>Описание</p>
      <Textarea
        name='description'
        value={productData.description}
        onChange={handleChange}
        placeholder='Описание'
        className='border p-2 w-full mb-4'
      />
      <div>
        <p className='mb-2'>Изображения</p>
        <Upload listType='picture-card' fileList={fileList} onChange={handleUploadChange}>
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </div>
      <p className='mb-2'>Детальное описание</p>
      <CustomEditor propsValue={productData.detailed_description} getValue={handleEditorChange} />
      <p className='mb-2 mt-3'>Категория</p>
      <Select value={productData.category} onValueChange={handleCategoryChange}>
        <SelectTrigger className='border p-2 w-full mb-4'>
          <SelectValue placeholder='Категория' />
        </SelectTrigger>
        <SelectContent>
          {categories?.categories.map(({name}) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className='mb-2'>Теги, через запятую</p>
      <Input
        type='text'
        name='tags'
        value={productData.tags}
        onChange={handleChange}
        placeholder='Теги'
        className='border p-2 w-full mb-4'
      />
      <div className='flex justify-end space-x-4'>
        <Button onClick={handleSubmit} type='submit' className='px-4 py-2 rounded-md'>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
