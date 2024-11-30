import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as authService from '../services/auth.service';

export const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await authService.register({ email, password, name });
  res.status(201).json({
    status: 'success',
    data: { user }
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login({ email, password });
  res.json({ status: 'success', data: { user, token } });
});