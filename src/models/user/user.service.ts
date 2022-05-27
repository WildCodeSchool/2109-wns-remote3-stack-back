import SignupArgs from '@auth/args/signup.args';
import UserPrismaDto from '@user/dto/userDto.prisma';
import IUser from '@user/types/user.type';
import { comparePassword, hashPassword } from '@utils/auth/bcrypt';

import { log } from '@utils/logger/logger';
import { AuthenticationError, UserInputError } from 'apollo-server-core';
import IUserPayload from './types/payload.args';
import IUserPasswordPayload from './types/payloadPassword';
import IUserWithProjects from './types/userWithProjects.type';
import IUserWithTasks from './types/userWithTask.type';

interface IUserWithPassword extends IUser {
  password: string;
}

export default function UserService() {
  // ** CREATE
  async function createOneUser(args: SignupArgs): Promise<IUser> {
    const user = await UserPrismaDto().createOne(args);
    return user;
  }

  // ** UPDATE USER INFOS
  async function updateUserById(
    payload: IUserPayload,
    id: string,
  ): Promise<IUser |null > {
    const user = await UserPrismaDto().updateUser(payload, { id });
    return user;
  }

  // ** UPDATE USER PASSWORD
  // eslint-disable-next-line consistent-return
  async function updateUserPassword(
    payload: IUserPasswordPayload,
    id: string,
  ): Promise<IUser | null | undefined> {
    try {
      const user = await UserPrismaDto().oneById({ id });
      if (user) {
        const valid = await comparePassword(payload.lastPassword, user.password);
        if (!valid) {
          log.warn('Incorrect password');
          throw new UserInputError('Incorrect password');
        } else {
          const hashedPassword = await hashPassword(payload.password);
          const updatedUser = await UserPrismaDto().updateUserPassword({ id }, hashedPassword);
          return updatedUser;
        }
      }
    } catch (error) {
      log.error(error);
      throw new AuthenticationError('Session expired', { error });
    }
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

  async function findByEmail(email: string): Promise<IUserWithPassword> {
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

  async function findByIdWithTasks(id: string): Promise<IUserWithTasks> {
    const userWithTask = await UserPrismaDto().oneByIdWithTasks({ id });
    if (!userWithTask) {
      throw new Error('User not found');
    }
    return userWithTask;
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
    findByIdWithTasks,
    findById,
    findByEmail,
    findByIdWithProjects,
    deleteById,
    updateUserById,
    updateUserPassword,
  };
}
