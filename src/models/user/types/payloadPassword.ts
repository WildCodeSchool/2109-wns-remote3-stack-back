import { Field, ID, ArgsType } from 'type-graphql';

@ArgsType()
export default abstract class IUserPasswordPayload {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    password: string;

  @Field(() => String)
    lastPassword: string;
}
