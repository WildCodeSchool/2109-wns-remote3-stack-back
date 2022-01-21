import { UserProject } from '@prisma/client';
import IUserProjectPayload from '@userProject/types/userProjectPayload.args';
import { prisma } from '@utils/prisma';

export default function UserProjectPrismaDto() {
  async function createOne(
    payload: IUserProjectPayload,
  ): Promise<UserProject> {
    return prisma.userProject.create({
      data: {
        ...payload,
      },
      include: {
        user: true,
        project: true,
      },
    });
  }

  async function editOne(
    payload: IUserProjectPayload,
  ): Promise<UserProject> {
    return prisma.userProject.update({
      where: {
        userId_projectId: {
          userId: payload.userId,
          projectId: payload.projectId,
        },
      },
      data: {
        projectRole: payload.projectRole,
      },
    });
  }

  async function deleteOne(
    userId: string,
    projectId: string,
  ): Promise<UserProject> {
    return prisma.userProject.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });
  }

  return {
    createOne,
    editOne,
    deleteOne,
  };
}
