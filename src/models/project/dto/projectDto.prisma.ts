import { Prisma, Project, UserProject } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';

interface ProjectWithMembers extends Project {
  members: UserProject[],
}

export default function ProjectPrismaDto() {
  // ** READ
  async function all(): Promise<ProjectWithMembers[]> {
    return prisma.project.findMany({
      include: {
        members: true,
      },
    });
  }

  async function oneById(
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<ProjectWithMembers | null> {
    return prisma.project.findUnique({
      where: id,
      include: {
        members: true,
      },
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
