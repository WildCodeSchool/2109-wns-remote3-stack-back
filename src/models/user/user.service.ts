import SignupArgs from '@auth/args/signup.args';
import UserPrismaDto from '@user/dto/userDto.prisma';
import IUser from '@user/types/user.type';
import { COOKIE_SETTINGS, getTokenPayload } from '@utils/auth/authUtils';
import { IContext } from '@utils/context/interface/context.interface';
import { log } from '@utils/logger/logger';

export default function UserService() {
  // ** CREATE
  async function createOneUser(args: SignupArgs): Promise<IUser> {
    const user = await UserPrismaDto().createOne(args);
    return user;
  }

  // ** READ
  async function allUsers(): Promise<IUser[]> {
    const users = await UserPrismaDto().all();
    if (!users) {
      throw new Error('No users found');
    }
    return users;
  }

  async function findById(id: string): Promise<IUser> {
    const user = await UserPrismaDto().oneById({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async function findByEmail(email: string): Promise<IUser> {
    const user = await UserPrismaDto().oneByEmail({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // ** UPDATE
  async function verifyUser(token: string, context: IContext): Promise<IUser> {
    log.info('Trying to verify user');
    const { userId } = getTokenPayload(token);
    const user = await UserPrismaDto().oneById({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    if (user.verified) {
      throw new Error('User is already verified');
    }
    await UserPrismaDto().updateOneById({ id: userId }, { verified: true });
    context.res.cookie('stack_session', token, COOKIE_SETTINGS);
    return {
      ...user,
      verified: true,
    };
  }

  // ** DELETE
  async function deleteById(id: string): Promise<IUser> {
    const user = await UserPrismaDto().deleteOneById({ id });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  return {
    createOneUser,
    allUsers,
    findById,
    findByEmail,
    verifyUser,
    deleteById,
  };
}
