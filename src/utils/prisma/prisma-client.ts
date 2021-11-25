/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.IS_TEST === 'true') {
  // eslint-disable-next-line no-return-assign
  console.log('test Mode');
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://test:test@localhost:3308/test?schema=public',
      },
    },
  });
  console.log(prisma);
} else {
  prisma = new PrismaClient();
}

export { prisma };
