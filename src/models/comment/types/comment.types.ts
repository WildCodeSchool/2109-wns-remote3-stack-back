import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class IComment {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  taskId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
