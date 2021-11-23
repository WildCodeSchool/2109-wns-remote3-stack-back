import { Prisma, Project, Task, UserProject } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';
import IProjectPayload from '../types/payload.type';

interface ProjectWithDetails extends Project {
  members: UserProject[];
  tasks: Task[];
}

export default function ProjectPrismaDto() {
  // ** READ
  async function all(): Promise<ProjectWithDetails[]> {
    return prisma.project.findMany({
      include: {
        members: true,
        tasks: true,
      },
    });
  }

  async function oneById(id: Prisma.ProjectWhereUniqueInput): Promise<ProjectWithDetails | null> {
    return prisma.project.findUnique({
      where: id,
      include: {
        members: true,
        tasks: true,
      },
    });
  }

  // ** READ
  async function deleteOneById(id: Prisma.ProjectWhereUniqueInput): Promise<ProjectWithDetails | null> {
    return prisma.project.delete({
      where: id,
      include: {
        members: true,
        tasks: true,
      },
    });
  }

  // ** CREATE
  async function createProject(payload: IProjectPayload): Promise<ProjectWithDetails | null> {
    return prisma.project.create({
      data: {
        status: payload.status,
        startDate: payload.startDate,
        endDate: payload.endDate,
        estimeeSpentTime: payload.estimeeSpentTime,
      },
      include: {
        members: true,
        tasks: true,
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
