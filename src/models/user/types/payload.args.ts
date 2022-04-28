import { Field, ID, ArgsType } from 'type-graphql';

@ArgsType()
export default abstract class IUserPayload {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    email: string;

  @Field(() => String)
    firstName: string;

  @Field(() => String)
    lastName: string;

  @Field(() => String, { nullable: true })
    avatar?: string | null;
}
