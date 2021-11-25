import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import ITask from '../../task/types/task.type';
import ITaskPrisma from '../../task/types/taskPrisma.type';

@ObjectType()
export default abstract class ITag {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    label: string;

  @Field(() => String)
    color: string;

  @Field(() => [ITask])
    tasks: ITaskPrisma[];
}
