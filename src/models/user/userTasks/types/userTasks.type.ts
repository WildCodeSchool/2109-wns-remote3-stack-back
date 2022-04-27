import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUserTask {
  @Field(() => ID)
    userId: string;

  @Field(() => ID)
    taskId: string;
}
