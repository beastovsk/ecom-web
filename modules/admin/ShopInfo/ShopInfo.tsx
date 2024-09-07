'use client';

import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {createMain, getMain, updateMain} from '@/data/api/admin';
import {useMutation, useQuery} from 'react-query';
import {Upload, UploadProps} from 'antd';
import {RcFile} from 'antd/lib/upload';
import {UploadOutlined} from '@ant-design/icons';
import {useToast} from '@/components/ui/use-toast';

export const ShopInfo: React.FC = () => {
  const {data, refetch} = useQuery('main', getMain); // Fetch current main data
  const {mutate: create} = useMutation(createMain, {
    onSuccess: () => refetch() // Refetch after creation
  });
  const {mutate: update} = useMutation(updateMain, {
    onSuccess: () => refetch() // Refetch after update
  });
  const {toast} = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    seo_tags: '',
    address: '',
    email: '',
    phone: '',
    inn: ''
  });

  const [isLogoUpdated, setIsLogoUpdated] = useState(false); // Track if logo is updated

  useEffect(() => {
    if (data?.isCreated) {
      // Populate form with existing data if record is already created
      const mainData = data.main[0]; // Assuming 'main' is an array with a single object
      setFormData({
        name: mainData.name || '',
        description: mainData.description || '',
        logo: mainData.logo || '', // Existing logo URL to be shown in UI
        seo_tags: mainData.seo_tags || '',
        address: mainData.address || '',
        email: mainData.email || '',
        phone: mainData.phone || '',
        inn: mainData.inn || ''
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleLogoUpload: UploadProps['beforeUpload'] = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setFormData((prev) => ({...prev, logo: base64}));
      setIsLogoUpdated(true); // Mark logo as updated
    };
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {name, description, seo_tags, address, email, phone, inn} = formData;

    // If logo is updated, use base64, otherwise use existing URL
    const logoToSend = isLogoUpdated ? formData.logo : '';

    const jsonData = {
      name,
      description,
      logo: logoToSend, // Either base64 or existing URL
      seo_tags,
      address,
      email,
      phone,
      inn
    };

    if (data?.isCreated) {
      // Update existing main
      update(
        {id: data.main[0].id, mainData: jsonData},
        {
          onSuccess: (data) => {
            toast({title: 'Уведомление об обновлении данных', description: data.message});
          }
        }
      );
    } else {
      // Create new main
      create(jsonData, {
        onSuccess: (data) => {
          toast({title: 'Уведомление об обновлении данных', description: data.message});
        }
      });
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Информация о магазине</h1>
      <div className='p-4 shadow-md rounded-lg'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Название магазина</label>
            <Input
              type='text'
              name='name'
              placeholder='Название магазина'
              value={formData.name}
              onChange={handleInputChange}
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Описание</label>
            <Textarea
              name='description'
              placeholder='Описание магазина'
              value={formData.description}
              onChange={handleInputChange}
              className='border p-2 w-full h-24'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Логотип</label>
            <Upload beforeUpload={handleLogoUpload} showUploadList={false}>
              <Button className='border p-2 w-full'>
                <UploadOutlined />
                Загрузить логотип
              </Button>
            </Upload>
            {formData.logo && !isLogoUpdated && (
              <img src={formData.logo} alt='Логотип' style={{maxWidth: '200px', marginTop: '10px'}} />
            )}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>SEO теги</label>
            <Input
              type='text'
              name='seo_tags'
              placeholder='SEO теги'
              value={formData.seo_tags}
              onChange={handleInputChange}
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Адрес</label>
            <Input
              type='text'
              name='address'
              placeholder='Адрес'
              value={formData.address}
              onChange={handleInputChange}
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Телефон</label>
            <Input
              type='text'
              name='phone'
              placeholder='Телефон'
              value={formData.phone}
              onChange={handleInputChange}
              className='border p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>ИНН</label>
            <Input
              type='text'
              name='inn'
              placeholder='ИНН'
              value={formData.inn}
              onChange={handleInputChange}
              className='border p-2 w-full'
            />
          </div>
          <Button type='submit' className='px-4 py-2 rounded-md'>
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};
