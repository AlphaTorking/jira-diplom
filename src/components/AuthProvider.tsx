'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  login: string;
  email: string;
  isAdmin: boolean;
  accessToken: string; // Добавляем accessToken в пользователя
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  getAccessToken: () => string | null; // Функция для получения токена
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  getAccessToken: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

   const restoreSession = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.status === 401) {
      // Принудительный выход при невалидной сессии
      setUser(null);
      // Очищаем куки на клиенте
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session restore failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        restoreSession();
        const interval = setInterval(restoreSession, 5 * 60 * 1000); // Каждые 5 минут
        
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          const { user } = await response.json();
          setUser(user);
        }
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    router.push('/');
  };

  const logout = async () => {
    setUser(null);
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/login');
  };

  const getAccessToken = () => {
    return user?.accessToken || null;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);