import { UserProject } from '@prisma/client';
import IUserProjectPayload from '@userProject/types/userProjectPayload.type';
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

  return {
    createOne,
    editOne,
  };
}
