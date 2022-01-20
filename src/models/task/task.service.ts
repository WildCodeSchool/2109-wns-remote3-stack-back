import ITask from '@task/types/task.type';
import TaskPrismaDto from '@task/dto/taskDto.prisma';
import ITaskPayload from '@task/types/taskPayload.args';
import ITagPayload from '@tag/types/TagPayload.args';

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

  async function deleteById(id: string): Promise<ITask> {
    const task = await TaskPrismaDto().deleteOneById({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async function createTask(payload: ITaskPayload): Promise<ITask> {
    const task = await TaskPrismaDto().createTask(payload);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async function createTaskWithTags(payload: ITaskPayload, tags: ITagPayload[]): Promise<ITask> {
    const task = await TaskPrismaDto().createTaskWithTags(payload, tags);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  async function updateById(payload: ITaskPayload, id: string): Promise<ITask> {
    const task = await TaskPrismaDto().updateOneById(payload, { id });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  }

  return {
    allTasks,
    findById,
    deleteById,
    createTask,
    createTaskWithTags,
    updateById,
  };
}
