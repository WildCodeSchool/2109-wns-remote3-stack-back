import { createTransport } from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, EMAIL, EMAIL_PASSWORD } from '..';

// Setup Nodemailer transporter with SMTP mail infos
export default createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});
