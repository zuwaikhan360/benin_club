import nodemailer from "nodemailer";
const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  attachments?: Buffer
) => {
  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptionsWithoutAttach = {
    from: `Benin Club <${process.env.EMAIL_USER}>`,
    // from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
  };

  console.log(attachments);

  const mailOptionsWithAttach = {
    from: `Benin Club <${process.env.EMAIL_USER}>`,
    // from: process.env.EMAIL_USER,
    to,
    subject,
    html: body,
    attachments: [
      {
        filename: "Newsletter.pdf",
        content: attachments,
        contentType: "application/pdf",
      },
    ],
  };

  try {
    const mailOptions = attachments
      ? mailOptionsWithAttach
      : mailOptionsWithoutAttach;
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    return false;
  }
};

export default sendEmail;
