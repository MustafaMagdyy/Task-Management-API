import dotenv from 'dotenv';
import app from './app';
import prisma from './config/db';

dotenv.config();

const port = process.env.PORT || 3000;


async function connectDB() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}


const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});