import { verifyToken } from './tokens';
import { NextResponse } from 'next/server';

export const getCurrentUser = async (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  return decoded.userId;
};