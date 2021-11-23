import { Prisma, Tag } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';

export default function TagPrismaDto() {
  // ** READ
  async function all(): Promise<Tag[]> {
    return prisma.tag.findMany();
  }

  async function oneById(
    id: Prisma.TagWhereUniqueInput,
  ): Promise<Tag | null> {
    return prisma.tag.findUnique({
      where: id,
    });
  }

  // ** READ
  async function deleteOneById(
    id: Prisma.TagWhereUniqueInput,
  ): Promise<Tag | null> {
    return prisma.tag.delete({
      where: id,
    });
  }

  return {
    all,
    oneById,
    deleteOneById,
  };
}
