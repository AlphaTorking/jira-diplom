import './globals.css';
import { ReactNode } from 'react';
import {AuthProvider} from '@/components/AuthProvider';

export const metadata = {
  title: 'TaskHunter',
  description: 'Система управления задачами',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}