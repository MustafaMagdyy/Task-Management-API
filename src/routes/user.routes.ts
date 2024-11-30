import express from 'express';
import { protect } from '../middlewares/auth.middleware';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { updateProfileSchema } from '../validations/user.validation';

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.patch('/profile', validate(updateProfileSchema), updateProfile);

export default router;