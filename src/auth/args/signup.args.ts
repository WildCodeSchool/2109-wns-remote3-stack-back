import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class SignupArgs {
  @Field()
    email: string;

  @Field()
    password: string;

  @Field()
    firstName: string;

  @Field()
    lastName: string;
}
