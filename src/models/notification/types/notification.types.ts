import { ObjectType, Field, ID } from 'type-graphql';
import 'reflect-metadata';

@ObjectType()
export default abstract class INotification {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    message: string;

  @Field(() => String)
    userId: string;

  @Field(() => Boolean)
    viewed: boolean;
}
