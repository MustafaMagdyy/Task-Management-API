import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as taskService from '../services/task.service';

export const createTask = catchAsync(async (req: Request, res: Response) => {
 const task = await taskService.createTask({
   ...req.body,
   userId: req.user!.id
 });
 res.status(201).json({ status: 'success', data: { task } });
});

export const getTasks = catchAsync(async (req: Request, res: Response) => {
 const tasks = await taskService.getTasks(req.user!.id);
 res.json({ status: 'success', data: { tasks } });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
 const task = await taskService.updateTask(
   parseInt(req.params.id), 
   req.body,
   req.user!.id
 );
 res.json({ status: 'success', data: { task } });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
 await taskService.deleteTask(parseInt(req.params.id), req.user!.id);
 res.status(204).json();
});