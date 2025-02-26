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

// Get all orders of User
router.get('/:userId/orders', UserControllers.getAllOrdersOfUser);

// Get total price of orders of User
router.get('/:userId/orders/total-price', UserControllers.getTotalPriceOfOrdersOfUser);

export const UserRoutes = router;
