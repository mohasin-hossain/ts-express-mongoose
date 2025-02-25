import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Will call the controller
router.post('/create-user', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);

export const UserRoutes = router;
