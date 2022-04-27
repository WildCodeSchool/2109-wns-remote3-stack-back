import SignupArgs from '@auth/args/signup.args';
import UserPrismaDto from '@user/dto/userDto.prisma';
import IUser from '@user/types/user.type';
import IUserWithProjects from './types/userWithProjects.type';
import IUserWithTasks from './types/userWithTasks.types';

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
    findById,
    findByEmail,
    findByIdWithProjects,
    findByIdWithTasks,
    deleteById,
  };
}
