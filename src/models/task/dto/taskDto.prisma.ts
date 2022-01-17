import {
  Comment, Prisma, Tag, Task, User,
} from '@prisma/client';
import { prisma } from '@utils/prisma/prisma-client';
import ITaskPayload from '@task/types/PayloadTask.types';

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
    return prisma.task.update({
      where: id,
      data: {
        subject: payload.subject,
        projectId: payload.projectId,
        endDate: payload.endDate,
        advancement: payload.advancement,
        estimeeSpentTime: payload.estimeeSpentTime,
      },
      include: {
        users: true,
        comments: true,
        tags: true,
      },
    });
  }

  async function createTask(payload: ITaskPayload): Promise<TaskWithDetails | null> {
    return prisma.task.create({
      data: {
        subject: payload.subject,
        projectId: payload.projectId,
        endDate: payload.endDate,
        advancement: payload.advancement,
        estimeeSpentTime: payload.estimeeSpentTime,
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
    createTask,
  };
}
