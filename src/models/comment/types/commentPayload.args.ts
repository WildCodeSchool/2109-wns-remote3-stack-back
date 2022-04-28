import {
  ArgsType,
  Field,
} from 'type-graphql';

@ArgsType()
export default abstract class ICreateCommentPayload {
  @Field(() => String, { nullable: true })
    text?: string;

  @Field(() => String, { nullable: true })
    userId?: string;

  @Field(() => String, { nullable: true })
    taskId?: string;
}
