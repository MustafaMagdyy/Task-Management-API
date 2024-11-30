import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as userService from '../services/user.service';
export const getProfile = catchAsync(async (req: Request, res: Response) => {
    const { password, ...userWithoutPassword } = req.user!;
    
    res.json({
      status: 'success',
      data: { user: userWithoutPassword }
    });
  });
  export const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.updateProfile(req.user!.id, req.body);
    res.json({
      status: 'success',
      data: { user }
    });
  });