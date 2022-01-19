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

  return {
    createOne,
  };
}
