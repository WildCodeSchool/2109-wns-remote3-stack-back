import {
  Prisma,
  Project,
  Task,
  UserProject,
  ProjectRole,
} from '@prisma/client';
import { prisma } from '@utils/prisma/prisma-client';
import IProjectPayload from '@project/types/payload.args';

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
        tasks: {
          include: {
            users: true,
            comments: true,
            tags: true,
          },
        },
      },
    });
  }

  async function oneById(id: Prisma.ProjectWhereUniqueInput): Promise<ProjectWithDetails | null> {
    return prisma.project.findUnique({
      where: id,
      include: {
        members: true,
        tasks: {
          include: {
            users: true,
            comments: true,
            tags: true,
          },
        },
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
        tasks: {
          include: {
            users: true,
            comments: true,
            tags: true,
          },
        },
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
        tasks: {
          include: {
            users: true,
            comments: true,
            tags: true,
          },
        },
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
