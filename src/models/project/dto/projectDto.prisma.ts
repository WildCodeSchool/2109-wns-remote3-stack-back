import { Prisma, Project } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';

export default function ProjectPrismaDto() {
  // ** READ
  async function all(): Promise<Project[]> {
    return prisma.project.findMany();
  }

  async function oneById(
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return prisma.project.findUnique({
      where: id,
    });
  }

  // ** READ
  async function deleteOneById(
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return prisma.project.delete({
      where: id,
    });
  }

  return {
    all,
    oneById,
    deleteOneById,
  };
}
