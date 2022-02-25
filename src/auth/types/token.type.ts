import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default abstract class IToken {
  @Field(() => String)
    token: string;
}
