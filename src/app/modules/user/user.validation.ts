import { z } from 'zod';

// FullName Zod schema
const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name cannot exceed 50 characters'),
});

// Address Zod schema
const AddressValidationSchema = z.object({
  street: z
    .string()
    .min(1, 'Street is required')
    .max(100, 'Street cannot exceed 100 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City cannot exceed 50 characters'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(50, 'Country cannot exceed 50 characters'),
});

// Order Zod schema
const OrderValidationSchema = z.object({
  productName: z
    .string()
    .min(1, 'Product name is required')
    .max(100, 'Product name cannot exceed 100 characters'),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .int('Price must be an integer'),
  quantity: z
    .number()
    .min(1, 'Quantity must be at least 1')
    .int('Quantity must be an integer'),
});

// User Zod schema
const UserValidationSchema = z.object({
  userId: z
    .number()
    .min(1, 'User ID is required')
    .int('User ID must be an integer'),
  username: z
    .string()
    .min(1, 'Username is required')
    .max(30, 'Username cannot exceed 30 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(100, 'Password cannot exceed 100 characters'),
  fullName: FullNameValidationSchema,
  age: z
    .number()
    .min(0, 'Age must be a positive number')
    .int('Age must be an integer'),
  email: z
    .string()
    .min(1, 'Email is required')
    .max(100, 'Email cannot exceed 100 characters')
    .email('Email must be valid'),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).min(1, 'Hobbies are required'),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).min(1, 'Orders are required'),
  isDeleted: z.boolean().default(false),
});

export default UserValidationSchema;
