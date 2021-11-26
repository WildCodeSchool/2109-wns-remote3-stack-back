/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
