import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
// import IUserProject from '../../userProject/interface/UserProject';

@ObjectType()
export default abstract class IProject {
  @Field(() => ID)
    id: string;

  // @Field()
  //   members: IUserProject[];

  @Field()
    startDate: Date;

  @Field()
    endDate: Date;

  @Field(() => Number)
    estimeeSpentTime: number;
}
