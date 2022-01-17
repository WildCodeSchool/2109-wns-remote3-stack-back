import { ObjectType, Field, ID } from 'type-graphql';
import 'reflect-metadata';
import { Task } from '@prisma/client';
import IUserProject from '../../userProject/interface/userProject.type';
import ITask from '../../task/types/task.type';

@ObjectType()
export default abstract class IProject {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    name: string;

  @Field(() => String)
    status: string;

  @Field(() => [IUserProject])
    members: IUserProject[];

  @Field(() => [ITask])
    tasks: Task[];

  @Field(() => String)
    startDate: Date;

  @Field(() => String)
    endDate: Date;

  @Field(() => Number)
    estimeeSpentTime: number;
}
