import prisma from '../config/db';
import { AppError } from '../utils/appError';
import { TaskStatus } from '@prisma/client';

interface CreateTaskInput {
 title: string;
 description?: string;
 dueDate?: Date;
 status?: TaskStatus;
 userId: number;
}

export const createTask = async (data: CreateTaskInput) => {
 return prisma.task.create({ data });
};

export const getTasks = async (userId: number) => {
 return prisma.task.findMany({
   where: { userId },
   orderBy: { createdAt: 'desc' }
 });
};

export const updateTask = async (id: number, data: Partial<CreateTaskInput>, userId: number) => {
    const task = await prisma.task.findUnique({ 
      where: { id },
      include: { user: true } 
    });
    
    if (!task) throw new AppError('Task not found', 404);
    if (task.userId !== userId) throw new AppError('You can only update your own tasks', 403);
    if (data.status && !Object.values(TaskStatus).includes(data.status as TaskStatus)) {
      throw new AppError('Invalid task status', 400);
    }
  
    return prisma.task.update({
      where: { id },
      data
    });
  };

export const deleteTask = async (id: number, userId: number) => {
 const task = await prisma.task.findUnique({ where: { id } });
 
 if (!task) throw new AppError('Task not found', 404);
 if (task.userId !== userId) throw new AppError('Not authorized', 403);

 return prisma.task.delete({ where: { id } });
};