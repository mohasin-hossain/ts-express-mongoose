import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
  },
});

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true,
    maxlength: [100, 'Street cannot exceed 100 characters'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
    maxlength: [50, 'City cannot exceed 50 characters'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    maxlength: [50, 'Country cannot exceed 50 characters'],
  },
});

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [30, 'Username cannot exceed 30 characters'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    maxlength: [100, 'Password cannot exceed 100 characters'],
    select: false,
  },
  fullName: { type: FullNameSchema, required: [true, 'Full name is required'] },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be a positive number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    maxlength: [100, 'Email cannot exceed 100 characters'],
    match: [/^\S+@\S+\.\S+$/, 'Email must be valid'],
  },
  isActive: {
    type: Boolean,
    required: [true, 'Active status is required'],
    default: true,
  },
  hobbies: { type: [String], required: [true, 'Hobbies are required'] },
  address: { type: AddressSchema, required: [true, 'Address is required'] },
  orders: { type: [OrderSchema], required: [true, 'Orders are required'] },
});

// Middlewares
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Custom static method
userSchema.statics.isUserExists = async (userId: number) => {
  const existingUser = await User.findOne({ userId: userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
