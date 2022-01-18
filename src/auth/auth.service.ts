import { UserInputError } from 'apollo-server-errors';
import UserService from '@user/user.service';
import IUser from '@user/types/user.type';
import { IContext } from '@utils/context/interface/context.interface';
import { comparePassword, hashPassword } from '@utils/auth/bcrypt';
import { COOKIE_SETTINGS, createToken, createVerificationURL } from '@utils/auth/authUtils';
import { log } from '@utils/logger/logger';
import MailService from '@mail/mail.service';
import SignupArgs from './args/signup.args';
import LoginArgs from './args/login.args';

export default function AuthService() {
  async function validateUser(loginArgs: LoginArgs, context: IContext): Promise<IUser> {
    const user = await UserService().findByEmail(loginArgs.email);
    const valid = await comparePassword(loginArgs.password, user.password);
    if (!user || !valid) {
      log.warn('Incorrect email or password');
      throw new UserInputError('Incorrect email or password');
    }
    if (!user.verified) {
      log.warn('User is not verified');
      throw new UserInputError('User is not verified');
    }
    const token = createToken(user);
    context.res.cookie('stack_session', token, COOKIE_SETTINGS);
    return user;
  }

  async function signupUser(signupArgs: SignupArgs): Promise<IUser> {
    const password = await hashPassword(signupArgs.password);
    const user = await UserService().createOneUser({
      email: signupArgs.email,
      password,
      firstName: signupArgs.firstName,
      lastName: signupArgs.lastName,
    });
    const token = createToken(user);
    MailService().sendConfirmationEmail(signupArgs.email, createVerificationURL(token));
    log.info('Verification mail sent successfully');
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
