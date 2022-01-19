import { hash, compare } from 'bcryptjs';
import { BCRYPT_SALT } from '@environments/application';

/**
 * Returns hashed password by hash password.
 *
 * @param password - Password input
 * @returns The hashed password mean of `password`
 *
 */
// eslint-disable-next-line max-len
export const hashPassword = async (password: string): Promise<string> => hash(password, BCRYPT_SALT);

/**
 * Returns boolean by compare password.
 *
 * @param password - Password input
 * @param hash - The hashed password
 * @returns The boolean mean of `password` and `hash`
 *
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => compare(password, hashedPassword);
