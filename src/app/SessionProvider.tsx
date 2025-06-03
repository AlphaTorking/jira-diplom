// app/SessionProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  login: string;
  email: string;
  isAdmin: boolean;
}

interface Session {
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<Session>({
  user: null,
  isLoading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Проверяем наличие токена в localStorage (для "Запомнить меня")
    // и в sessionStorage (для обычной сессии)
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (authToken) {
      // Если есть токен, загружаем данные пользователя
      const userData = localStorage.getItem('user');
      
      if (userData) {
        setSession({
          user: JSON.parse(userData),
          isLoading: false,
        });
      } else {
        // Если данных нет, запрашиваем с сервера
        fetch('/api/auth/session', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then(res => res.json())
          .then(data => {
            setSession({
              user: data.user,
              isLoading: false,
            });
            localStorage.setItem('user', JSON.stringify(data.user));
          })
          .catch(() => {
            setSession({
              user: null,
              isLoading: false,
            });
          });
      }
    } else {
      setSession({
        user: null,
        isLoading: false,
      });
    }
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);