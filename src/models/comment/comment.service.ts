import IComment from '@comment/types/comment.type';
import CommentPrismaDto from '@comment/dto/commentDto.prisma';
import ICommentPayload from '@comment/types/createCommentPayload.args';

export default function CommentService() {
  //* Get all comments
  async function allComments(): Promise<IComment[]> {
    const comment = await CommentPrismaDto().getallComments();
    if (!comment) {
      throw new Error('No comments found');
    }
    return comment;
  }
  //* Get one comment by ID
  async function findCommentById(id: string): Promise<IComment> {
    const comment = await CommentPrismaDto().getOneCommentById({ id });
    if (!comment) {
      throw new Error('No comment found');
    }
    return comment;
  }

  //* Create a comment
  async function createNewComment(payload: ICommentPayload): Promise<IComment> {
    const comment = await CommentPrismaDto().createComment(payload);
    if (!comment) {
      throw new Error('Comment not created');
    }
    return comment;
  }
  //* Update a comment
  async function updateCommentById(payload: ICommentPayload, id: string): Promise<IComment> {
    const comment = await CommentPrismaDto().updateComment(payload, { id });
    if (!comment) {
      throw new Error('comment not updated');
    }
    return comment;
  }

  //* Delete a comment
  async function deleteById(id: string): Promise<IComment> {
    const comment = await CommentPrismaDto().deleteOneCommentById({ id });
    if (!comment) {
      throw new Error('Comment not found');
    }
    return comment;
  }

  return {
    allComments,
    findCommentById,
    deleteById,
    createNewComment,
    updateCommentById,
  };
}
