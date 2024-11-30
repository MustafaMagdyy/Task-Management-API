import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from './controllers/errorController';
import authRouter from './routes/auth.routes';
import taskRouter from './routes/task.routes';
const app = express();


// Middleware
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/v1/auth', authRouter);
app.use('/v1/tasks', taskRouter);
app.use(errorHandler);
export default app;