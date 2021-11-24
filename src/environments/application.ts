// Bcrypt variables
const BCRYPT_SALT: number = +process.env.BCRYPT_SALT!;

// JWT variables
const APP_TOKENIZATION_SECRET: string = process.env.TOKEN_PRIVATE_KEY!;

export {
  BCRYPT_SALT,
  APP_TOKENIZATION_SECRET,
};
