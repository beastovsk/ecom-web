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

  const [errors, setErrors] = useState<any>({}); // Состояние ошибок
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
    setErrors((prev) => ({...prev, [name]: ''})); // Очистить ошибку при изменении поля
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

  const validateForm = () => {
    const newErrors: any = {};
    const {name, description, seo_tags, address, email, phone, inn} = formData;

    if (!name) newErrors.name = 'Название магазина обязательно';
    if (!description) newErrors.description = 'Описание обязательно';
    if (!seo_tags) newErrors.seo_tags = 'SEO теги обязательны';
    if (!address) newErrors.address = 'Адрес обязателен';
    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!phone) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = 'Телефон должен содержать только цифры';
    }
    if (!inn) {
      newErrors.inn = 'ИНН обязателен';
    } else if (!/^\d+$/.test(inn)) {
      newErrors.inn = 'ИНН должен содержать только цифры';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Если нет ошибок, вернуть true
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Валидация перед отправкой

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
        <div>
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
            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
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
            {errors.description && <p className='text-red-500 text-sm'>{errors.description}</p>}
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
            {errors.seo_tags && <p className='text-red-500 text-sm'>{errors.seo_tags}</p>}
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
            {errors.address && <p className='text-red-500 text-sm'>{errors.address}</p>}
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
            {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
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
            {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
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
            {errors.inn && <p className='text-red-500 text-sm'>{errors.inn}</p>}
          </div>
          <Button className='px-4 py-2 rounded-md' onClick={handleSubmit}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};
