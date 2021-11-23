import { Prisma, Project, UserProject } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';
import IProjectPayload from '../types/payload.type';

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
  ): Promise<ProjectWithMembers | null> {
    return prisma.project.delete({
      where: id,
      include: {
        members: true,
      },
    });
  }

  // ** CREATE
  async function createProject(payload: IProjectPayload):Promise<ProjectWithMembers | null> {
    return prisma.project.create({
      data: {
        status: payload.status,
        startDate: payload.startDate,
        endDate: payload.endDate,
        estimeeSpentTime: payload.estimeeSpentTime,
      },
      include: {
        members: true,
      },
    });
  }

  return {
    all,
    oneById,
    deleteOneById,
    createProject,
  };
}
