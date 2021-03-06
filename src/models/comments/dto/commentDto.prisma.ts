import {
  Comment,
  Prisma,
} from '@prisma/client';
import { prisma } from '../../../utils/prisma/prisma-client';
import ICommentPayload from '../types/createComment.type';

export default function CommentPrismaDto() {
  //* Get all comments
  async function getallComments(): Promise<Comment[]> {
    return prisma.comment.findMany({

    });
  }
  //* Get one comment by Id
  async function getOneCommentById(id: Prisma.TaskWhereUniqueInput): Promise<Comment | null> {
    return prisma.comment.findUnique({
      where: id,
    });
  }
  //*  Create a comment
  async function createComment(payload: ICommentPayload): Promise<Comment> {
    return prisma.comment.create({
      data: {
        ...payload,
      },
    });
  }

  // //*  Update comment by id
  async function updateComment(
    payload: ICommentPayload,
    id: Prisma.CommentWhereUniqueInput,
  ): Promise<Comment> {
    return prisma.comment.update({
      where: id,
      data: {
        ...payload,
      },
    });
  }
  //*  Delete comment by id
  async function deleteOneCommentById(
    id: Prisma.ProjectWhereUniqueInput,
  ): Promise<Comment| null> {
    return prisma.comment.delete({
      where: id,
    });
  }

  return {
    getallComments,
    getOneCommentById,
    createComment,
    updateComment,
    deleteOneCommentById,
  };
}
