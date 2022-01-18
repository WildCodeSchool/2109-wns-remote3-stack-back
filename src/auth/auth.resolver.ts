import {
  Args, Mutation, Resolver, Ctx,
} from 'type-graphql';
import { log } from '@utils/logger/logger';
import { IContext } from '@utils/context/interface/context.interface';
import IUser from '@user/types/user.type';
import LoginArgs from './args/login.args';
import AuthService from './auth.service';
import SignupArgs from './args/signup.args';

@Resolver(() => IUser)
export default class AuthResolver {
  @Mutation(() => IUser)
  async login(
    @Args() loginArgs: LoginArgs,
    @Ctx() context: IContext,
  ): Promise<IUser | null> {
    const email = loginArgs.email.toLowerCase().trim();
    log.verbose(`Trying to authenticate user, ${email}`);
    const user = await AuthService().validateUser(
      {
        email,
        password: loginArgs.password,
      },
      context,
    );
    log.info(`Authentication success, ${email}`);
    return user;
  }

  @Mutation(() => IUser)
  async signup(
    @Args() signupArgs: SignupArgs,
  ): Promise<IUser> {
    log.verbose('Trying to signup user', signupArgs.email);
    const email = signupArgs.email.toLowerCase().trim();
    const user = await AuthService().signupUser({
      ...signupArgs,
      email,
    });
    log.info('User successfully created, ', signupArgs.email);
    return user;
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() context: IContext,
  ): Promise<boolean> {
    log.verbose('Trying to logout user');
    const logout = await AuthService().logoutUser(context);
    return logout;
  }
}
