import {
  Prisma,
  Project,
  Task,
  UserProject,
  ProjectRole,
} from '@prisma/client';
import { prisma } from '@utils/prisma/prisma-client';
import IProjectPayload from '@project/types/payload.args';
import { log } from '@utils/logger/logger';
import { ApolloError } from 'apollo-server-errors';
import ICreateProjectPayload from '@project/types/createProjectPayload.args';

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
      orderBy: {
        name: 'asc',
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

  async function oneById(
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<ProjectWithDetails | null> {
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
  ) {
    try {
      await prisma.$transaction([
        prisma.userProject.deleteMany({ where: { projectId: id.id } }),
        prisma.task.deleteMany({ where: { projectId: id.id } }),
        prisma.project.delete({ where: id }),
      ]);
      return true;
    } catch (error) {
      log.error(error);
      throw new ApolloError('An unexpected error occured', undefined, { error });
    }
  }

  // ** CREATE
  async function createProject(
    payload: ICreateProjectPayload,
  ): Promise<ProjectWithDetails | null> {
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
