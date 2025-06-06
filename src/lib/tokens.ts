import jwt from 'jsonwebtoken';
import prisma from './prismaClient';
const JWT_SECRET = process.env.JWT_SECRET || 'your_strong_secret_here';

export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
};
// src/lib/tokens.ts
export const validateRefreshToken = async (token: string) => {
  try {
    const decoded = verifyToken(token);
    if (!decoded) return false;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });
    
    return user?.refreshToken === token;
  } catch {
    return false;
  }
};