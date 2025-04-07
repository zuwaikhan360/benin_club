import Constant, { IConstant } from '@/models/constant.model';
import Newsletter, { INewsletter } from '@/models/newsletter.model';
import User, { IUser } from '@/models/user.model';
import { connectDB } from '@/utils/mongoose';
import sendEmail from '@/utils/sendEmail';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    // Create a new newsletter subscription
    const newsletters: INewsletter[] = await Newsletter.find();
    const emails: string[] = newsletters.map((newsletter) => newsletter.email);
    const existUsers = await User.find({ email: { $in: emails } });

    const newletterUrl: IConstant | null = await Constant.findOne({
      name: 'newsletter',
    });
    if (!newletterUrl) {
      return res.status(404).json({ error: 'No newsleter found' });
    }

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    const message = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Benin Club Monthly Newsletter - ${month} ${year}</title>
      </head>
      <body>
        <table
          style="
            width: 100%;
            max-width: 600px;
            margin: auto;
            border-collapse: collapse;
          "
        >
          <tr>
            <td
              style="padding: 20px; text-align: center; background-color: #f9b6b6"
            >
              <h2 style="color: red">Benin Club Monthly Newsletter</h2>
              <p>
                We hope this email finds you well. As part of our commitment to
                keeping you informed, we are excited to share the latest edition of
                the BeninClub Monthly Newsletter for ${month} ${year}.
              </p>
            </td>
          </tr>
          <tr>
            <td
              style="padding: 20px; text-align: center; background-color: #f4f4f4"
            >
              <p>
                To access the full content of our newsletter, please click on the
                link below:
              </p>
              <p>
                <a
                  href='${newletterUrl.value}'
                  style="text-decoration: none; color: red; font-weight: bold"
                  >Download Newsletter</a
                >
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px; text-align: center">
              <p>
                Your feedback is invaluable to us. If you have any comments,
                suggestions, or would like to contribute to future editions, feel
                free to reach out to us at
                <a
                  href="mailto:your_contact_email@example.com"
                  style="text-decoration: none; color: red"
                  >info@beninclub1931.com</a
                >.
              </p>
              <p>Thank you for your continued support!</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    
  `;

    for (const existUser of existUsers) {
      sendEmail(existUser.email, 'Newsletter', message);
    }
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
}
