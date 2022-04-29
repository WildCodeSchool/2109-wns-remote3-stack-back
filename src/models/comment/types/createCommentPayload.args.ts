import {
  ArgsType,
  Field,
} from 'type-graphql';

@ArgsType()
export default abstract class ICreateCommentPayload {
  @Field(() => String)
    text: string;

  @Field(() => String)
    userId: string;

  @Field(() => String)
    taskId: string;
}
