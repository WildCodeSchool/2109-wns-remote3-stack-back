import SignupArgs from '@auth/args/signup.args';
import UserPrismaDto from '@user/dto/userDto.prisma';
import IUser from '@user/types/user.type';
import UserProjectPrismaDto from '@userProject/dto/userProjectDto.prisma';
import IUserWithProjects from './types/userWithProjects.type';

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

  async function findUsersByProjectId(projectId: string): Promise<IUser[]> {
    const projectUsers = await UserProjectPrismaDto().allByProjectId(projectId);
    const users = projectUsers.map((p) => p.user);
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
    findUsersByProjectId,
    findById,
    findByEmail,
    findByIdWithProjects,
    deleteById,
  };
}
