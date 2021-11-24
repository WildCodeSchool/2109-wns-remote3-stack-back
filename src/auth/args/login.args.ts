import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export default class LoginArgs {
  @Field()
    email: string;

  @Field()
    password: string;
}
