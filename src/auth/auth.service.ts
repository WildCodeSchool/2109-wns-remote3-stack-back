import { UserInputError, AuthenticationError } from 'apollo-server-errors';
import IUserWithToken from '@user/types/userWithToken.type';
import UserService from '../models/user/user.service';
import LoginArgs from './args/login.args';
import { comparePassword, hashPassword } from '../utils/auth/bcrypt';
import { createToken } from '../utils/auth/authUtils';
import SignupArgs from './args/signup.args';
import { log } from '../utils/logger/logger';
import IToken from './types/token.type';

export default function AuthService() {
  async function validateUser(loginArgs: LoginArgs): Promise<IUserWithToken> {
    try {
      const user = await UserService().findByEmail(loginArgs.email);
      const valid = await comparePassword(loginArgs.password, user.password);
      if (!user || !valid) {
        log.warn('Incorrect email or password');
        throw new UserInputError('Incorrect email or password');
      }
      const token = createToken(user);
      return {
        ...user,
        token,
      };
    } catch (error) {
      log.error(error);
      throw new AuthenticationError('Session expired', { error });
    }
  }

  async function signupUser(signupArgs: SignupArgs): Promise<IUserWithToken> {
    const password = await hashPassword(signupArgs.password);
    const user = await UserService().createOneUser({
      email: signupArgs.email,
      password,
      firstName: signupArgs.firstName,
      lastName: signupArgs.lastName,
    });
    const token = createToken(user);
    return {
      ...user,
      token,
    };
  }

  async function logoutUser(): Promise<IToken> {
    log.info('Logout successful');
    return {
      token: '',
    };
  }

  return {
    validateUser,
    signupUser,
    logoutUser,
  };
}
