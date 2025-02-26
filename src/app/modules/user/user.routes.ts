import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Create a User
router.post('/create-user', UserControllers.createUser);

// Get all Users
router.get('/', UserControllers.getAllUsers);

// Get a single User
router.get('/:userId', UserControllers.getSingleUser);

// Update a User
router.patch('/:userId', UserControllers.updateUser);

// Delete a User
router.delete('/:userId', UserControllers.deleteUser);

// Add a new Product
router.put('/:userId/orders', UserControllers.addNewProduct);

export const UserRoutes = router;
