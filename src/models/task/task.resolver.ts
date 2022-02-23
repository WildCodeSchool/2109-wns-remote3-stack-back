/* eslint-disable comma-dangle */
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import TaskService from '@task/task.service';
import ITask from '@task/types/task.type';
import ITaskPayload from '@task/types/taskPayload.args';
import ITagPayload from '@tag/types/TagPayload.args';
import { IContext } from '@utils/context/interface/context.interface';

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
  async updateTaskById(
    @Args() payload: ITaskPayload,
    @Arg('id') id: string,
    @Ctx() context: IContext,
  ): Promise<ITask> {
    return TaskService().updateById(payload, id, context);
  }

  @Mutation(() => ITask)
  async createTaskWithTags(
    @Args() payload: ITaskPayload,
    @Arg('tags', () => [ITagPayload]) tags: ITagPayload[],
    @Ctx() context: IContext,
  ): Promise<ITask> {
    return TaskService().createTaskWithTags(payload, tags, context);
  }

  // * DELETE
  @Mutation(() => ITask)
  async deleteTaskById(
    @Arg('id') id: string,
    @Ctx() context: IContext,
  ): Promise<ITask> {
    return TaskService().deleteById(id, context);
  }
}
