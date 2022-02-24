import IComment from '@comment/types/comment.type';
import CommentPrismaDto from '@comment/dto/commentDto.prisma';
import ICommentPayload from '@comment/types/createCommentPayload.args';
import UserService from '@user/user.service';
import { IContext } from '@utils/context/interface/context.interface';
import NotificationService from '@notification/notification.service';
import TaskService from '@task/task.service';
import { PubSubEngine } from 'type-graphql';

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
  async function createNewComment(
    payload: ICommentPayload,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<IComment> {
    const comment = await CommentPrismaDto().createComment(payload);
    if (!comment) {
      throw new Error('Comment not created');
    }
    const user = await UserService().findById(context.userId || '');
    const task = await TaskService().findById(comment.taskId);

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'ADDED',
      modifiedObjectName: comment.id,
      modifiedObjectId: comment.id,
      onId: comment.taskId,
      type: 'COMMENT',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return comment;
  }
  //* Update a comment
  async function updateCommentById(
    payload: ICommentPayload,
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<IComment> {
    const comment = await CommentPrismaDto().updateComment(payload, { id });
    if (!comment) {
      throw new Error('comment not updated');
    }
    const user = await UserService().findById(context.userId || '');
    const task = await TaskService().findById(comment.taskId);

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'EDITED',
      modifiedObjectName: comment.id,
      modifiedObjectId: comment.id,
      onId: comment.taskId,
      type: 'COMMENT',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return comment;
  }

  //* Delete a comment
  async function deleteById(
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<IComment> {
    const comment = await CommentPrismaDto().deleteOneCommentById({ id });
    if (!comment) {
      throw new Error('Comment not found');
    }
    const user = await UserService().findById(context.userId || '');
    const task = await TaskService().findById(comment.taskId);

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'DELETED',
      modifiedObjectName: comment.id,
      modifiedObjectId: comment.id,
      onId: comment.taskId,
      type: 'COMMENT',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

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
