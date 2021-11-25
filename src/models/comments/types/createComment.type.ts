import {
  ArgsType,
  Field,
} from 'type-graphql';

@ArgsType()
export default abstract class ICommentPayload {
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
