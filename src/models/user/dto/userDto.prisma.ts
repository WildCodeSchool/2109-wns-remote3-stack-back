import { User } from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';

export default function UserPrismaDto() {
  // ** READ
  async function getAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  return {
    getAll,
  };
}
