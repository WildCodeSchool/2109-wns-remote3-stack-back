import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import TaskService from './task.service';
import ITask from './types/task.type';
import ITaskPayload from './types/PayloadTask.types';

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
  async updateTaskById(@Args() payload: ITaskPayload, @Arg('id') id: string): Promise<ITask> {
    return TaskService().updateById(payload, id);
  }

  //* CREATE
  @Mutation(() => ITask)
  async createTask(@Args() payload: ITaskPayload): Promise<ITask> {
    payload.startDate = new Date(payload.startDate);
    return TaskService().createTask(payload);
  }

  // * DELETE
  @Mutation(() => ITask)
  async deleteTaskById(@Arg('id') id: string): Promise<ITask> {
    return TaskService().deleteById(id);
  }
}
