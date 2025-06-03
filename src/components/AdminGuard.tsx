
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    // Проверяем данные пользователя из localStorage
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
      return;
    }
    
    const user = JSON.parse(userJson);
    if (!user.isAdmin) {
      router.push('/');
    }
  }, []);
  
  return <>{children}</>;
}