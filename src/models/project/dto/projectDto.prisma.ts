import {
  Prisma,
  Project,
  Task,
  UserProject,
  ProjectRole,
} from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';
import IProjectPayload from '../types/payload.type';

interface UserProjectWithRole extends UserProject {
    projectRole: ProjectRole;
}
interface ProjectWithDetails extends Project {
  members: UserProjectWithRole[];
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

  // ** DELETE
  async function deleteOneById(
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<ProjectWithDetails | null> {
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
        ...payload,
      },
      include: {
        members: true,
        tasks: true,
      },
    });
  }

  // ** UPDATE
  async function updateProject(
    payload: IProjectPayload,
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<ProjectWithDetails | null> {
    return prisma.project.update({
      where: id,
      data: {
        ...payload,
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
    updateProject,
  };
}
