import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import Newsletter, { INewsletter } from "@/models/newsletter.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: "You must log in to access this resource." });

    const { user: loginUser } = session;

    if (loginUser.role !== "admin" && loginUser.role !== "user") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await connectDB();

    switch (req.method) {
      case "GET":
        const post: INewsletter | null = await Newsletter.findById(
          req.query.id
        );
        if (!post) {
          res.status(404).json({ message: "Newsletter not found" });
        } else {
          res.status(200).json(post);
        }
        break;
      case "PUT":
        const updatedPost: INewsletter | null =
          await Newsletter.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
          });
        if (!updatedPost) {
          res.status(404).json({ message: "Newsletter not found" });
        } else {
          res.status(200).json(updatedPost);
        }
        break;
      case "DELETE":
        const deletedPost: INewsletter | null =
          await Newsletter.findByIdAndDelete(req.query.id);
        if (!deletedPost) {
          res.status(404).json({ message: "Newsletter not found" });
        } else {
          res.status(200).json(deletedPost);
        }
        break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
