import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IProject {
  @Field(() => ID)
    id: string;

  @Field()
    startDate: Date;

  @Field()
    endDate: Date;

  @Field(() => Number)
    estimeeSpentTime: number;
}
