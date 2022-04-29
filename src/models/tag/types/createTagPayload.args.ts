import { Field, ID, InputType } from 'type-graphql';

@InputType()
export default abstract class ICreateTagPayload {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    label: string;

  @Field(() => String)
    color: string;
}
