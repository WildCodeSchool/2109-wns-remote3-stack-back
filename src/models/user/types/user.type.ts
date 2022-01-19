import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUser {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    email: string;

  @Field(() => String)
    password: string;

  @Field(() => String)
    firstName: string;

  @Field(() => String)
    lastName: string;

  @Field(() => String, { nullable: true })
    avatar?: string | null;

  @Field(() => Boolean)
    verified: boolean;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => Date)
    updatedAt: Date;
}
