import { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "express";
import multer from "multer";
import sendEmail from "@/utils/sendEmail";
import fs from "fs"; // Import the 'fs' module

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

type NextApiResponseCustom = NextApiResponse & Response;

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false, // Disable the built-in bodyParser
  },
};

export default async function handler(
  req: NextApiRequestWithFormData,
  res: NextApiResponseCustom
) {
  if (req.method === "POST") {
    try {
      // Use the multer middleware to handle file upload
      upload.single("pdf")(req, res, async function (error) {
        if (error) {
          return res.status(400).json({ error: "File upload failed" });
        }

        const { email } = req.body;

        if (!email) {
          return res.status(400).json({ error: "email is required" });
        }

        // Retrieve the uploaded PDF file
        const pdfFile = req.file;

        if (!pdfFile) {
          return res.status(400).json({ error: "PDF file not provided" });
        }

        const subject = "Benin Club Newsletter";
        const msg = "Here is our latest Newsletter";

        // Read the file from the server's filesystem
        const pdfBuffer = fs.readFileSync(pdfFile.path);

        // Send the PDF file as an attachment in an email
        await sendEmail(email, subject, msg, pdfBuffer);

        // Delete the stored PDF file after sending the email
        fs.unlinkSync(pdfFile.path);

        res.status(200).json({ message: "PDF file sent via email" });
      });
    } catch (error) {
      console.log("Error handling PDF upload:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
