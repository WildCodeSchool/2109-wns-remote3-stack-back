import { Field, ID, ArgsType } from 'type-graphql';

@ArgsType()
export default abstract class IUserPayload {
  @Field(() => ID, { nullable: true })
    id?: string;

  @Field(() => String, { nullable: true })
    email?: string;

  @Field(() => String, { nullable: true })
    firstName?: string;

  @Field(() => String, { nullable: true })
    lastName?: string;

  @Field(() => String, { nullable: true })
    avatar?: string | null;
}
