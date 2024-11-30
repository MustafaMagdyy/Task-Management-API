import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { verifyToken } from '../utils/jwt.util';
import prisma from '../config/db';
import { catchAsync } from '../utils/catchAsync';
export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError('Please log in to access this route', 401);
   
   
    const decoded = verifyToken(token);
    
  
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });
    if (!user) throw new AppError('User no longer exists', 401);
   
    req.user = user;
    next();
   });