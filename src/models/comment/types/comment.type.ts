import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IComment {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    text: string;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => Date)
    updatedAt: Date;

  @Field(() => String)
    userId: string;

  @Field(() => String)
    taskId: string;
}
