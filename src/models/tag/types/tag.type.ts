import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class ITag {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    label: string;

  @Field(() => String)
    color: string;
}
