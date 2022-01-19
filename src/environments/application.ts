// Bcrypt variables
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT!;

// JWT variables
const APP_TOKENIZATION_SECRET: string = process.env.TOKEN_PRIVATE_KEY!;

const FRONTEND_URL: string = process.env.FRONTEND_URL!;

// Mail variables
const SMTP_HOST: string = process.env.SMTP_HOST!;
const SMTP_PORT: number = +process.env.SMTP_PORT!;
const EMAIL: string = process.env.EMAIL!;
const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD!;

export {
  BCRYPT_SALT,
  APP_TOKENIZATION_SECRET,
  FRONTEND_URL,
  SMTP_HOST,
  SMTP_PORT,
  EMAIL,
  EMAIL_PASSWORD,
};
