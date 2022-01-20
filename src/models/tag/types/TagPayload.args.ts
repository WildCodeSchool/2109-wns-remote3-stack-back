import { Field, InputType } from 'type-graphql';

@InputType()
export default abstract class ITagPayload {
  @Field(() => String)
    label: string;

  @Field(() => String)
    color: string;
}
