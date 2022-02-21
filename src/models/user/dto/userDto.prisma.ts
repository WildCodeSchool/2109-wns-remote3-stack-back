import { Prisma, User, UserProject } from '@prisma/client';
import SignupArgs from '@auth/args/signup.args';
import { prisma } from '@utils/prisma';

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
  };
}
