import { Field, ArgsType } from 'type-graphql';

@ArgsType()
export default abstract class IPayloadNotification {
  @Field(() => String)
    message: string;

  @Field(() => String)
    userId: string;

  @Field(() => Boolean)
    viewed: boolean;
}
