// app/login/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiLock, FiCheck} from 'react-icons/fi';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Новое состояние
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        throw new Error('Неверные учетные данные');
      }
      
      const data = await response.json();
      
      // Сохраняем токен с учетом "Запомнить меня"
      if (rememberMe) {
        localStorage.setItem('authToken', data.token);
      } else {
        sessionStorage.setItem('authToken', data.token);
      }
      
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
      
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Вход в систему</h1>
          <p className="text-gray-600 mt-2">Введите ваши учетные данные</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Имя пользователя
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`flex items-center h-5 w-5 border rounded ${
                  rememberMe ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}
              >
                {rememberMe && <FiCheck className="text-white mx-auto" />}
              </button>
              <label 
                onClick={() => setRememberMe(!rememberMe)}
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Запомнить меня
              </label>
            </div>
            
            <button 
              type="button" 
              className="text-sm text-blue-500 hover:underline"
            >
              Забыли пароль?
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}