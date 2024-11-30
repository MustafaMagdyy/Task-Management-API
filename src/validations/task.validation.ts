import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING')
  })
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.string().datetime().optional(),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).optional()
  }),
  params: z.object({
    id: z.string().transform(val => parseInt(val, 10))
  })
});