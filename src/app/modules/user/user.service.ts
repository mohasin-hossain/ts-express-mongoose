import { User } from '../user.model';
import { TOrder, TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    },
  );

  // OR

  //   const result = await User.find().select(
  //     'username fullName age email address -_id',
  //   );

  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId: userId }, { orders: 0 });
    return result;
  } else {
    throw new Error('User not found');
  }
};

const updateUserIntoDB = async (
  userId: number,
  updatedUser: Partial<TUser>,
) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) throw new Error('User not found');

  const result = await User.findOneAndUpdate(
    { userId: userId },
    {
      $set: updatedUser,
    },
    {
      new: true,
      projection: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
        _id: 0,
      },
      lean: true,
    },
  );

  return result;
};

const deleteUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) throw new Error('User not found');

  const result = await User.updateOne({ userId: userId }, { isDeleted: true });
  return result;
};

const addNewProductToOrderIntoDB = async (
  userId: number,
  newProduct: TOrder,
) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) throw new Error('User not found');

  const result = await User.updateOne(
    { userId: userId },
    { $addToSet: { orders: newProduct } },
    { upsert: true },
  );
  return result;
};

const getAllOrdersOfUserFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);
  if (!existingUser) throw new Error('User not found');

  const result = await User.find({ userId: userId }).select('orders -_id');
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addNewProductToOrderIntoDB,
  getAllOrdersOfUserFromDB,
};
