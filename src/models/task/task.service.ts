import ITask from '@task/types/task.type';
import TaskPrismaDto from '@task/dto/taskDto.prisma';
import ITaskPayload from '@task/types/taskPayload.args';
import ITagPayload from '@tag/types/TagPayload.args';
import NotificationService from '@notification/notification.service';
import UserService from '@user/user.service';
import { IContext } from '@utils/context/interface/context.interface';
import { PubSubEngine } from 'type-graphql';

export default function TaskService() {
  async function allTasks(): Promise<ITask[]> {
    const task = await TaskPrismaDto().all();
    if (!task) {
      throw new Error('No tasks found');
    }
    return task;
  }

  async function findById(id: string): Promise<ITask> {
    const task = await TaskPrismaDto().oneById({ id });
    if (!task) {
      throw new Error('No task found');
    }
    return task;
  }

  async function deleteById(
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<ITask> {
    const task = await TaskPrismaDto().deleteOneById({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'DELETED',
      modifiedObjectName: task.name,
      modifiedObjectId: task.id,
      onId: task.projectId,
      type: 'TASK',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return task;
  }

  async function createTaskWithTags(
    payload: ITaskPayload,
    tags: ITagPayload[],
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<ITask> {
    const task = await TaskPrismaDto().createTaskWithTags(payload, tags);
    if (!task) {
      throw new Error('Task not found');
    }
    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'ADDED',
      modifiedObjectName: task.name,
      modifiedObjectId: task.id,
      onId: task.projectId,
      type: 'TASK',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return task;
  }

  async function updateById(
    payload: ITaskPayload,
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<ITask> {
    const task = await TaskPrismaDto().updateOneById(payload, { id });
    if (!task) {
      throw new Error('Task not found');
    }
    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'EDITED',
      modifiedObjectName: task.name,
      modifiedObjectId: task.id,
      onId: task.projectId,
      type: 'TASK',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return task;
  }

  async function updateTaskByIdWithTags(
    payload: ITaskPayload,
    tags: ITagPayload[],
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<ITask> {
    const task = await TaskPrismaDto().updateOneByIdWithTags(payload, tags, { id });
    if (!task) {
      throw new Error('Task not found');
    }

    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'EDITED',
      modifiedObjectName: task.name,
      modifiedObjectId: task.id,
      onId: task.projectId,
      type: 'TASK',
    }, task.projectId);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return task;
  }

  return {
    allTasks,
    findById,
    deleteById,
    createTaskWithTags,
    updateById,
    updateTaskByIdWithTags,
  };
}
