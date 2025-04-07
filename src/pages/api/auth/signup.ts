// import { connectDB } from '@/utils/mongoose';
// import User, { IUser } from '@/models/user.model';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function signup(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {
//   if (req.method !== 'POST') {
//     res.status(405).json({ message: 'Method not allowed' });
//     return;
//   }

//   try {
//     // Connect to MongoDB
//     await connectDB().catch((err) => res.status(409).json(err));

//     // Parse request body as IUser
//     const userData: IUser = req.body;

//     // Validate user data
//     const errors = validateUserData(userData);
//     if (errors.length > 0) {
//       res.status(400).json({ message: 'Invalid user data', errors });
//       return;
//     }

//     const existingUser = {};
//     // const existingUser = await User.findByEmail(userData.email);
//     if (existingUser) {
//       // User with this email already exists
//       res.status(400).json({ message: 'User with this email already exists' });
//       return;
//     }

//     // Create new user
//     const newUser = new User(userData);

//     // Save new user to database
//     await newUser.save();

//     res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// function validateUserData(user: IUser): string[] {
//   const errors: string[] = [];

//   // Validate email
//   if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
//     errors.push('Invalid email');
//   }

//   // Validate first name
//   if (
//     !user.firstName ||
//     user.firstName.length < 2 ||
//     user.firstName.length > 20
//   ) {
//     errors.push('First name must be between 2 and 20 characters');
//   }

//   // Validate last name
//   if (!user.lastName || user.lastName.length < 2 || user.lastName.length > 20) {
//     errors.push('Last name must be between 2 and 20 characters');
//   }

//   // Validate status
//   if (user.status !== 'Active' && user.status !== 'Inactive') {
//     errors.push('Invalid status');
//   }

//   // Validate level
//   if (
//     user.level !== 'Basic' &&
//     user.level !== 'Premium' &&
//     user.level !== 'VIP'
//   ) {
//     errors.push('Invalid level');
//   }

//   // Validate join date
//   // if (!user.joinDate || isNaN(Date.parse(user.joinDate))) {
//   //   errors.push("Invalid join date");
//   // }

//   // Validate renewal date
//   // if (!user.renewalDate || isNaN(Date.parse(user.renewalDate))) {
//   //   errors.push("Invalid renewal date");
//   // }

//   // Validate payment info
//   // if (!user.paymentInfo) {
//   //   errors.push('Payment info is required');
//   // }

//   return errors;
// }
