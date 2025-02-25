import { Request, Response } from 'express';
import UserValidationSchema from './user.validation';
import { UserServices } from './user.service';

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

export const UserControllers = {
  createUser,
  getAllUsers
};
