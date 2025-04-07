import type { NextApiRequest, NextApiResponse } from 'next';
import { Request, Response } from 'express';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

type NextApiResponseCustom = NextApiResponse & Response;

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
const region = process.env.AWS_BUCKET_REGION || '';
const bucket = process.env.AWS_BUCKET_NAME || '';

const s3 = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

export default async function handler(
  req: NextApiRequestWithFormData,
  res: NextApiResponseCustom
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  try {
    const { image } = req.body;
    console.log(image);
    if (!image) {
      return res.status(404).json({ message: 'Image url not found' });
    }
    const deleteKey = image.substring(image.lastIndexOf('/') + 1);
    const params = {
      Bucket: bucket,
      Key: deleteKey as string,
    };
    console.log('deleteKey', deleteKey);
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to deleting image');
  }
}
