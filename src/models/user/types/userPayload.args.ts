import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class IUserPayload {
  @Field(() => String, { nullable: true })
    email?: string;

  @Field(() => String, { nullable: true })
    password?: string;

  @Field(() => String, { nullable: true })
    firstName?: string;

  @Field(() => String, { nullable: true })
    lastName?: string;

  @Field(() => String, { nullable: true })
    avatar?: string | null;

  @Field(() => Boolean, { nullable: true })
    verified?: boolean;
}
