
import express from 'express';
import { protect } from '../middlewares/auth.middleware';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller';
import { validate } from '../middlewares/validate.middleware';
import {createTaskSchema, updateTaskSchema } from '../validations/task.validation';
const router = express.Router();

router.use(protect); 

router.post('/', validate(createTaskSchema), createTask);
router.get('/', getTasks);
router.patch('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);

export default router;