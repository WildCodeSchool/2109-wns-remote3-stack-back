import ITask from './types/task.type';
import TaskPrismaDto from './dto/taskDto.prisma';
import IUpdateTask from './types/PayloadTask.types';
import ITaskPayload from './types/PayloadTask.types';

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
    updateById,
  };
}
