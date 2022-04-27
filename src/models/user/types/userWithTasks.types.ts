import { Task } from '@prisma/client';
import ITask from '@task/types/task.type';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUserWithTasks {
  @Field(() => ID)
    id: string;

  @Field(() => [ITask])
    tasks: Task[];
}
