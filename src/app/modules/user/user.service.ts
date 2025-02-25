import { User } from '../user.model';
import { TUser } from './user.interface';

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

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
