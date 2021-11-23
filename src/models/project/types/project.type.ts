import { ObjectType, Field, ID } from 'type-graphql';
import 'reflect-metadata';
import IUserProject from '../../userProject/interface/userProject.type';

@ObjectType()
export default abstract class IProject {
  @Field(() => ID)
    id: string;

  @Field(() => [String])
    members: IUserProject[];

  @Field(() => String)
    startDate: Date;

  @Field(() => String)
    endDate: Date;

  @Field(() => Number)
    estimeeSpentTime: number;
}
