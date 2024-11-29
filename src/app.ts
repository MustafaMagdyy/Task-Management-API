import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

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

export default app;