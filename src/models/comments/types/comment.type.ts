import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IComment {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    text: string;

  @Field(() => String)
    createdAt: Date;

  @Field(() => String)
    updatedAt: Date;

  @Field(() => String)
    userId: string;

  @Field(() => String)
    taskId: string;
}
