import {
  Args, Mutation, Resolver,
} from 'type-graphql';
import IUserWithToken from '@user/types/userWithToken.type';
import IUser from '../models/user/types/user.type';
import LoginArgs from './args/login.args';
import AuthService from './auth.service';
import SignupArgs from './args/signup.args';
import { log } from '../utils/logger/logger';
import IToken from './types/token.type';

@Resolver(() => IUser)
export default class AuthResolver {
  @Mutation(() => IUserWithToken)
  async login(
    @Args() loginArgs: LoginArgs,
  ): Promise<IUserWithToken | null> {
    const email = loginArgs.email.toLowerCase().trim();
    log.verbose(`Trying to authenticate user, ${email}`);
    const user = await AuthService().validateUser(
      {
        email,
        password: loginArgs.password,
      },
    );
    log.info(`Authentication success, ${email}`);
    return user;
  }

  @Mutation(() => IUserWithToken)
  async signup(
    @Args() signupArgs: SignupArgs,
  ): Promise<IUserWithToken> {
    log.verbose('Trying to signup user', signupArgs.email);
    const email = signupArgs.email.toLowerCase().trim();
    const user = await AuthService().signupUser({
      ...signupArgs,
      email,
    });
    log.info('User successfully created, ', signupArgs.email);
    return user;
  }

  @Mutation(() => IToken)
  async logout(): Promise<IToken> {
    log.verbose('Trying to logout user');
    const logout = await AuthService().logoutUser();
    return logout;
  }
}
