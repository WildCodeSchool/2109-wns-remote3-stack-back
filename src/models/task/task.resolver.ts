import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import TaskService from './task.service';
import ITask from './types/task.type';
import ITaskPayload from './types/updateTask.types';

@Resolver(() => ITask)
export default class TaskResolver {
  // * READ
  @Query(() => [ITask])
  async getAllTasks(): Promise<ITask[]> {
    return TaskService().allTasks();
  }

  //* ONEBYID
  @Query(() => ITask)
  async getTaskByID(@Arg('id') id: string): Promise<ITask> {
    return TaskService().findById(id);
  }

  //* UPDATE
  @Mutation(() => ITask)
  async updateTaskById(@Args() payload: ITaskPayload): Promise<ITask> {
    return TaskService().updateById(payload);
  }

  //* CREATE

  @Mutation(() => ITask)
  async createTaskById(@Args() payload: ITaskPayload): Promise<ITask> {
    return TaskService().createTask(payload);
  }

  // * DELETE
  @Mutation(() => ITask)
  async deleteTaskById(@Arg('id') id: string): Promise<ITask> {
    return TaskService().deleteById(id);
  }
}
