import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { ProjectRole } from '.prisma/client';

@ObjectType()
export default abstract class IUserProject {
  @Field(() => ID)
    userId: string;

  @Field(() => ID)
    projectId: string;

  @Field(() => String)
    projectRole: ProjectRole;
}
