import prisma from '../config/db';
import { AppError } from '../utils/appError';
import { hashPassword } from '../utils/password.util';
import { generateToken } from '../utils/jwt.util';
import { comparePasswords } from '../utils/password.util';
interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
    email: string;
    password: string;
  }

  
export const register = async (input: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: input.email }
  });

  if (existingUser) {
    throw new AppError('Email already exists', 400);
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      email: input.email,
      password: hashedPassword,
      name: input.name
    }
  });

  const token = generateToken(user.id);

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};


export const login = async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new AppError('Invalid email or password', 401);
  
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) throw new AppError('Invalid email or password', 401);
  
    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, token };
  };