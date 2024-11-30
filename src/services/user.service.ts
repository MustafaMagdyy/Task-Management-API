import prisma from '../config/db';

export const updateProfile = async (userId: number, data: { name?: string }) => {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: data.name }
    });
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  };