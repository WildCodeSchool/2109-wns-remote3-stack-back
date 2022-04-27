import { Prisma, User, UserProject } from '@prisma/client';
import SignupArgs from '@auth/args/signup.args';
import { prisma } from '@utils/prisma';
import IUserPayload from '@user/types/payload.args';
import { hashPassword } from '@utils/auth/bcrypt';

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

  // ** UPDATE
  async function updateUser(
    payload: IUserPayload,
    id: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const password = await hashPassword(payload.password);
    return prisma.user.update({
      where: id,
      data: {
        email: payload.email,
        password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar: payload.avatar,
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
    oneByIdWithProjects,
    deleteOneById,
    updateUser,
  };
}
