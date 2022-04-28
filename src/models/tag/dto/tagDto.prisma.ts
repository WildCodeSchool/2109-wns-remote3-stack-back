import { Prisma, Tag, Task } from '@prisma/client';
import { prisma } from '@utils/prisma/prisma-client';
import ITagPayload from '@tag/types/TagPayload.args';
import ICreateTagPayload from '@tag/types/createTagPayload.args';

export interface TagDetails extends Tag {
tasks: Task[],
}

export default function TagPrismaDto() {
  //* Create method
  async function createTag(payload: ICreateTagPayload): Promise<TagDetails | null > {
    return prisma.tag.create({
      data: {
        ...payload,
      },
      include: {
        tasks: true,
      },
    });
  }
  //* Update
  async function updateTag(payload: ITagPayload, id : Prisma.TagWhereUniqueInput):
  Promise<TagDetails | null > {
    return prisma.tag.update({
      where: id,
      data: {
        ...payload,
      },
      include: {
        tasks: true,
      },
    });
  }
  // ** READ
  async function all(): Promise<TagDetails[]> {
    return prisma.tag.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async function oneById(
    id: Prisma.TagWhereUniqueInput,
  ): Promise<TagDetails | null> {
    return prisma.tag.findUnique({
      where: id,
      include: {
        tasks: true,
      },
    });
  }

  // ** READ
  async function deleteOneById(
    id: Prisma.TagWhereUniqueInput,
  ): Promise<TagDetails | null> {
    return prisma.tag.delete({
      where: id,
      include: {
        tasks: true,
      },
    });
  }

  return {
    all,
    oneById,
    deleteOneById,
    createTag,
    updateTag,
  };
}
