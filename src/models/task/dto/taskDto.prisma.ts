import {
  Comment, Prisma, Tag, Task, User,
} from '@prisma/client';
import { prisma } from '@utils/prisma/prisma-client';
import ITaskPayload from '@task/types/taskPayload.args';
import ITagPayload from '@tag/types/TagPayload.args';
import ICreateTaskPayload from '@task/types/createTaskPayload.args';

export interface TaskWithDetails extends Task {
  users: User[];
  comments: Comment[];
  tags: Tag[];
}

export default function TaskPrismaDto() {
  // * READ
  async function all(): Promise<TaskWithDetails[]> {
    return prisma.task.findMany({
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  async function oneById(id: Prisma.TaskWhereUniqueInput): Promise<TaskWithDetails | null> {
    return prisma.task.findUnique({
      where: id,
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  async function deleteOneById(id: Prisma.TaskWhereUniqueInput): Promise<TaskWithDetails | null> {
    return prisma.task.delete({
      where: id,
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  async function updateOneById(payload: ITaskPayload, id: Prisma.TaskWhereUniqueInput):
   Promise<TaskWithDetails | null> {
    const { userIds, projectId, ...rest } = payload;
    return prisma.task.update({
      where: id,
      data: {
        users: {
          connect: payload.userIds?.map((userId) => ({
            id: userId,
          })),
        },
        project: {
          connect: {
            id: projectId,
          },
        },
        ...rest,
      },
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  async function updateOneByIdWithTags(
    payload: ITaskPayload,
    tags: ITagPayload[],
    id: Prisma.TaskWhereUniqueInput,
  ): Promise<TaskWithDetails | undefined> {
    const { projectId, userIds, ...rest } = payload;
    return prisma.task.update({
      where: id,
      data: {
        ...rest,
        tags: {
          set: [],
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },
        project: {
          connect: {
            id: projectId,
          },
        },
        users: {
          connect: payload.userIds?.map((userId) => ({
            id: userId,
          })),
        },
      },
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  async function createTaskWithTags(
    payload: ICreateTaskPayload,
    tags: ITagPayload[],
  ): Promise<TaskWithDetails | null> {
    return prisma.task.create({
      data: {
        name: payload.name,
        description: payload.description,
        endDate: payload.endDate,
        estimeeSpentTime: payload.estimeeSpentTime,
        advancement: payload.advancement,
        tags: {
          connect: tags.map((tag) => ({
            id: tag.id,
          })),
        },
        project: {
          connect: {
            id: payload.projectId,
          },
        },
        users: {
          connect: payload.userIds.map((userId) => ({
            id: userId,
          })),
        },
      },
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  return {
    all,
    oneById,
    deleteOneById,
    updateOneById,
    updateOneByIdWithTags,
    createTaskWithTags,
  };
}
