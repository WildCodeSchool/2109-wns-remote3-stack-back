import { Prisma, Task } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';
import ITaskPayload from '../types/updateTask.types';

export default function TaskPrismaDto() {
  // * READ
  async function all(): Promise<Task[]> {
    return prisma.task.findMany();
  }

  async function oneById(id: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return prisma.task.findUnique({
      where: id,
    });
  }

  async function deleteOneById(id: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return prisma.task.delete({
      where: id,
    });
  }

  async function updateOneById(payload: ITaskPayload): Promise<Task | null> {
    return prisma.task.update({
      where: { id: payload.id },
      data: {
        subject: payload.subject,
        projectId: payload.projectId,
        startDate: payload.startDate,
        endDate: payload.endDate,
        advancement: payload.advancement,
        estimeeSpentTime: payload.estimeeSpentTime,
      },
    });
  }

  async function createTask(payload: ITaskPayload): Promise<Task | null> {
    return prisma.task.create({
      data: {
        subject: payload.subject,
        projectId: payload.id,
        startDate: payload.startDate,
        endDate: payload.endDate,
        advancement: payload.advancement,
        estimeeSpentTime: payload.estimeeSpentTime,
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
