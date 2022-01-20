import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUserProject {
  @Field(() => ID)
    userId: string;

  @Field(() => ID)
    projectId: string;

  @Field(() => String)
    projectRole: string;
}
