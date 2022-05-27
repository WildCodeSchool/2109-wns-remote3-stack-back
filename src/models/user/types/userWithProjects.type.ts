import IUserProject from '@userProject/types/userProject.type';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export default abstract class IUserWithProjects {
  @Field(() => ID)
    id: string;

  @Field(() => String)
    email: string;

  @Field(() => String)
    firstName: string;

  @Field(() => String)
    lastName: string;

  @Field(() => String, { nullable: true })
    avatar?: string | null;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => Date)
    updatedAt: Date;

  @Field(() => [IUserProject])
    projects: IUserProject[];
}
