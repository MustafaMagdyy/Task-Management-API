import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './controllers/errorController';
import authRouter from './routes/auth.routes';
import taskRouter from './routes/task.routes';
import userRouter from './routes/user.routes';
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use('/v1/auth', authRouter);
app.use('/v1/tasks', taskRouter);
app.use('/v1/users', userRouter);
app.use(errorHandler);
export default app;