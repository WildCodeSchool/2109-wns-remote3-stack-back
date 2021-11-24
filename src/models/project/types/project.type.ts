import { ObjectType, Field, ID } from 'type-graphql';
import 'reflect-metadata';
import IUserProject from '../../userProject/interface/userProject.type';
import ITask from '../../task/types/task.type';
import { Task } from '.prisma/client';

@ObjectType()
export default abstract class IProject {
  @Field(() => ID)
    id: string;

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
