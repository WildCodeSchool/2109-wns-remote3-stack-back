import { Task } from '@prisma/client';
import ITask from '@task/types/task.type';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUserWithTasks {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    email: string;

  @Field(() => String)
    firstName: string;

  @Field(() => String)
    lastName: string;

  @Field(() => String, { nullable: true })
    avatar?: string | null;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => Date)
    updatedAt: Date;

@Field(() => [ITask])
  tasks: Task[];
}
