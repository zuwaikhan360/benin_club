import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 20;
  const skip = (page - 1) * pageSize;
  const search = (req.query.search as string) || '';
  const searchRegex = new RegExp(search, 'i');

  const members: IUser[] = await User.find(
    {
      role: 'member',
      $or: [
        { surName: { $regex: searchRegex } },
        { firstName: { $regex: searchRegex } },
        { memberId: { $regex: searchRegex } },
      ].filter(Boolean),
    },
    { firstName: 1, surName: 1, memberId: 1, _id: 0 } // Projection to include only specific fields
  )
    .skip(skip)
    .limit(pageSize);
  const totalMembers: number = await User.countDocuments({
    role: 'member',
    $or: [
      { surName: { $regex: searchRegex } },
      { firstName: { $regex: searchRegex } },
      { memberId: { $regex: searchRegex } },
    ].filter(Boolean),
  });
  if (!members) {
    return res.status(404).json({ message: 'No members found' });
  }
  res.status(200).json({ members, totalMembers });
}
