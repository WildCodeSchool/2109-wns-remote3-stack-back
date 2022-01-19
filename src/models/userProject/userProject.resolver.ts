import { Args, Mutation, Resolver } from 'type-graphql';
import IUserProject from './types/userProject.type';
import IUserProjectPayload from './types/userProjectPayload.type';
import UserProjectService from './userProject.service';

@Resolver(() => IUserProject)
export default class UserProjectResolver {
  // * CREATE
  @Mutation(() => IUserProject)
  async createUserProject(
    @Args() payload: IUserProjectPayload,
  ): Promise<IUserProject> {
    return UserProjectService().createOneUserProject(payload);
  }
}
