import { Request, Response } from 'express';
import UserValidationSchema from './user.validation';
import { UserServices } from './user.service';
import { ZodError } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodParsedData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodParsedData);

    // Send Response
    res.status(200).json({
      success: true,
      message: 'User is created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      status: true,
      message: 'Users are retrieved successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      status: true,
      message: 'User is retrieved successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message || 'Something went wrong!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
// Define the possible error types
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUser = await req.body;
    const zodParsedUpdatedUser = UserValidationSchema.parse(updatedUser);

    const result = await UserServices.updateUserIntoDB(
      Number(userId),
      zodParsedUpdatedUser,
    );

    res.status(200).json({
      status: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message || 'Something went wrong!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUserFromDB(Number(userId));

    res.status(200).json({
      status: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      status: false,
      message: err.message || 'Something went wrong!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
