import Vehicle, { IVehicle } from "@/models/vehicle.model";
import { connectDB } from "@/utils/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import getNextVehicleId from "@/utils/utils";
import { authOptions } from "../../auth/[...nextauth]";
import User from "@/models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const session = await getServerSession(req, res, authOptions);

  if (!session)
    return res
      .status(401)
      .json({ message: "You must log in to access this resource." });

  const { user } = session;

  if (user.role !== "admin" && user.role !== "user") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const pageNumber = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.limit as string) || 24;
        const skip = (pageNumber - 1) * pageSize;

        const search = req.query.search?.toString() || "";
        const searchRegex = new RegExp(search, "i");

        // Find users based on the search criteria (username and phone)
        const matchingUsers = search
          ? await User.find({
              $or: [
                { memberId: { $regex: searchRegex } },
                { firstName: { $regex: searchRegex } },
                { surName: { $regex: searchRegex } },
              ],
            })
          : [];

        // Extract user IDs from matchingUsers
        const userIds = matchingUsers.map((user) => user._id);

        // Create the query for finding vehicles
        const vehicleQuery = search ? { memberId: { $in: userIds } } : {};

        const totalVehicles = await Vehicle.countDocuments(vehicleQuery);
        const totalPages = Math.ceil(totalVehicles / pageSize);

        const vehicles = await Vehicle.find(vehicleQuery)
          .populate({
            path: "memberId",
            select: "firstName surName username phone",
          })
          .skip(skip)
          .limit(pageSize);

        res.status(200).json({ vehicles, total: totalVehicles, totalPages });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong" });
      }

      break;

    case "POST":
      try {
        const {
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          qrCodeUrl,
        } = req.body;
        const vehicleId = await getNextVehicleId();
        const vehicle: IVehicle = new Vehicle({
          vehicleId,
          carPlateNumber,
          vehicleType,
          vehicleColor,
          purposeOfVehicle,
          regNumber,
          imageUrl,
          qrCodeUrl,
        });

        const savedVehicle = await vehicle.save();

        res.status(201).json(savedVehicle);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
