import { Prisma, Task, User, UserProject } from '@prisma/client';
import SignupArgs from '@auth/args/signup.args';
import { prisma } from '@utils/prisma';
import IUserPayload from '@user/types/payload.args';

export default function UserPrismaDto() {
  // ** CREATE
  async function createOne(args: SignupArgs) {
    return prisma.user.create({
      data: {
        ...args,
      },
    });
  }

  // ** READ
  async function all(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async function oneById(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: id,
    });
  }

  async function oneByEmail(
    email: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: email,
    });
  }

  async function oneByIdWithTasks(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<(User & {
    tasks: Task[]
  }) | null> {
    return prisma.user.findUnique({
      where: id,
      include: {
        tasks: {
          include: {
            comments: true,
          },
        },

      },
    });
  }

  async function oneByIdWithProjects(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<(User & {
      projects: UserProject[];
  }) | null> {
    return prisma.user.findUnique({
      where: id,
      include: {
        projects: true,
      },
    });
  }

  // ** UPDATE USER INFOS
  async function updateUser(
    payload: IUserPayload,
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.update({
      where: id,
      data: {
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: payload.avatar,
      } });
  }

  // ** UPDATE USER PASSWORD
  async function updateUserPassword(
    id: Prisma.UserWhereUniqueInput,
    hashedPassword: string,
  ): Promise<User | null> {
    return prisma.user.update({
      where: id,
      data: {
        password: hashedPassword,
      } });
  }

  // ** DELETE
  async function deleteOneById(
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return prisma.user.delete({
      where: id,
    });
  }

  return {
    createOne,
    all,
    oneById,
    oneByEmail,
    oneByIdWithTasks,
    oneByIdWithProjects,
    deleteOneById,
    updateUser,
    updateUserPassword,
  };
}
