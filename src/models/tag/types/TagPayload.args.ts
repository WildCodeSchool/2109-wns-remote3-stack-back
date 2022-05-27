import { Field, ID, InputType } from 'type-graphql';

@InputType()
export default abstract class ITagPayload {
  @Field(() => ID, { nullable: true })
    id?: string;

  @Field(() => String, { nullable: true })
    label?: string;

  @Field(() => String, { nullable: true })
    color?: string;
}
