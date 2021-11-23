import { UserInputError, AuthenticationError } from 'apollo-server-errors';
import UserService from '../models/user/user.service';
import IUser from '../models/user/types/user.type';
import { IContext } from '../utils/context/interface/context.interface';
import LoginArgs from './args/login.args';
import { comparePassword, hashPassword } from '../utils/auth/bcrypt';
import { COOKIE_SETTINGS, createToken } from '../utils/auth/authUtils';
import SignupArgs from './args/signup.args';
import { log } from '../utils/logger/logger';

export default function AuthService() {
  async function validateUser(loginArgs: LoginArgs, context: IContext): Promise<IUser> {
    try {
      const user = await UserService().findByEmail(loginArgs.email);
      const valid = await comparePassword(loginArgs.password, user.password);
      if (!user || !valid) {
        log.warn('Incorrect email or password');
        throw new UserInputError('Incorrect email or password');
      }
      const token = createToken(user);
      context.res.cookie('stack_session', token, COOKIE_SETTINGS);
      return user;
    } catch (error) {
      log.error(error);
      throw new AuthenticationError('Session expired', { error });
    }
  }

  async function signupUser(signupArgs: SignupArgs, context: IContext): Promise<IUser> {
    const password = await hashPassword(signupArgs.password);
    const user = await UserService().createOneUser({
      email: signupArgs.email,
      password,
      firstName: signupArgs.firstName,
      lastName: signupArgs.lastName,
    });
    const token = createToken(user);
    context.res.cookie('stack_session', token, COOKIE_SETTINGS);
    return user;
  }

  async function logoutUser(context: IContext): Promise<boolean> {
    context.res.clearCookie('stack_session', COOKIE_SETTINGS);
    log.info('Logout successful');
    return true;
  }

  return {
    validateUser,
    signupUser,
    logoutUser,
  };
}
