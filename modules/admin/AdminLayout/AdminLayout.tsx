'use client';

import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export const AdminLayout = ({children}) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Для управления состоянием аутентификации
  const token = getCookie('adminToken');

  useEffect(() => {
    const adminLogin = process.env.NEXT_PUBLIC_LOGIN; // Получаем значение переменной окружения

    if (!token || token !== adminLogin) {
      router.push('/admin/auth');
    } else {
      setIsAuthenticated(true); // Устанавливаем состояние аутентификации в true
    }
  }, [token, router]);

  // Пока проверка аутентификации не завершена, ничего не отображаем
  if (!isAuthenticated) return null;

  return <div>{children}</div>;
};
