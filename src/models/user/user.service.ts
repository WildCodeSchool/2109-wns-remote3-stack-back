import SignupArgs from '@auth/args/signup.args';
import UserPrismaDto from '@user/dto/userDto.prisma';
import IUser from '@user/types/user.type';
import { hashPassword } from '@utils/auth/bcrypt';
// import { hashPassword } from '@utils/auth/bcrypt';
import IUserPayload from './types/payload.args';
import IUserWithProjects from './types/userWithProjects.type';

export default function UserService() {
  // ** CREATE
  async function createOneUser(args: SignupArgs): Promise<IUser> {
    const user = await UserPrismaDto().createOne(args);
    return user;
  }

  // ** UPDATE
  async function updateUserById(
    payload: IUserPayload,
    id: string,
  ): Promise<IUser |null > {
    const passwordUpdate = await hashPassword(payload.password);

    const user = await UserPrismaDto().updateUser(payload, { id }, passwordUpdate);
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

  async function findByIdWithProjects(id: string): Promise<IUserWithProjects> {
    const userWithProjects = await UserPrismaDto().oneByIdWithProjects({ id });
    if (!userWithProjects) {
      throw new Error('User not found');
    }
    return userWithProjects;
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
    findByIdWithProjects,
    deleteById,
    updateUserById,
  };
}
