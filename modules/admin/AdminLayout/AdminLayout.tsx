'use client';

import {getCookie} from 'cookies-next';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export const AdminLayout = ({children}) => {
  const router = useRouter();

  const token = getCookie('adminToken');

  useEffect(() => {
    if (!token || token !== process.env.NEXT_PUBLIC_LOGIN) {
      router.push('/admin/auth');
    }
  }, []);
  if (!token) return <></>;

  return <div>{children}</div>;
};
