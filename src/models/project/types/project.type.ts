import { ObjectType, Field, ID } from 'type-graphql';
import 'reflect-metadata';
import IUserProject from '../../userProject/interface/userProject.type';
import ITask from '../../../models/task/types/task.type';

@ObjectType()
export default abstract class IProject {
  @Field(() => ID)
  id: string;

  @Field(() => [IUserProject])
  members: IUserProject[];

  @Field(() => [ITask])
  tasks: ITask[];

  @Field(() => String)
  startDate: Date;

  @Field(() => String)
  endDate: Date;

  @Field(() => Number)
  estimeeSpentTime: number;
}
