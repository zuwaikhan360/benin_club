import { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { SortOrder } from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: 'You must log in to access this resource.' });

    const { user: loginUser } = session;

    if (
      loginUser.role !== 'admin' &&
      loginUser.role !== 'user' &&
      loginUser.role !== 'wallet'
    ) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    switch (req.method) {
      case 'GET':
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;
        const skip = (page - 1) * pageSize;
        const sortField = (req.query.sort as string) || '_id';
        const sortOrder = ((req.query.order as string) || 'asc') as SortOrder;
        const sort: [string, SortOrder][] = [[sortField, sortOrder]];
        const category = (req.query.category as string) || 'all';
        const search = req.query.search?.toString() || '';
        const searchRegex = new RegExp(search, 'i');
        const isNumber = /^\d+$/.test(search);

        const categoryFilter = category === 'all' ? {} : { level: category };

        const members: IUser[] = await User.find({
          role: 'member',
          ...categoryFilter,
          $or: [
            { surName: { $regex: searchRegex } },
            { firstName: { $regex: searchRegex } },
            { memberId: { $regex: searchRegex } },
            // { tel: isNumber ? parseInt(search) : { $regex: searchRegex } },
          ].filter(Boolean),
        })
          .sort(sort)
          .skip(skip)
          .limit(pageSize);
        const totalMembers: number = await User.countDocuments({
          role: 'member',
          ...categoryFilter,
          $or: [
            { surName: { $regex: searchRegex } },
            { firstName: { $regex: searchRegex } },
            { memberId: { $regex: searchRegex } },
            // { tel: isNumber ? parseInt(search) : { $regex: searchRegex } },
          ].filter(Boolean),
        });
        res.status(200).json({ members, totalMembers });

        break;

      case 'POST':
        const { memberId, category: memberCategory } = req.body;
        const isExist = await User.findOne({ memberId });
        if (isExist) {
          isExist.level = memberCategory;
          await isExist.save();
          res.status(201).json(isExist);
        } else {
          const newUser: IUser = new User({ memberId });
          await newUser.save();
          res.status(201).json(newUser);
        }
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

async function updateMemberIdsToString() {
  try {
    // Establish database connection
    connectDB();

    // Retrieve all users
    const users = await User.find({});

    // Iterate over users and update memberId field
    for (const user of users) {
      if (user.memberId) {
        user.memberId = user.memberId.toString(); // Convert memberId to string
        await User.findByIdAndUpdate(user._id, { memberId: user.memberId });
      }
    }

    // Close the database connection
    // await mongoose.connection.close();

    // Return resolved promise
    return Promise.resolve();
  } catch (error) {
    // Handle errors and reject the promise
    return Promise.reject(error);
  }
}

// Call the function to update memberIds

// await updateMemberIdsToString()
//   .then(() => {
//     console.log("MemberIds updated successfully");
//   })
//   .catch((error) => {
//     console.error("Error updating memberIds:", error);
//   });
