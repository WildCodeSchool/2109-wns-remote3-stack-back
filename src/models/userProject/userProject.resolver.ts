import { Arg, Args, Mutation, Resolver } from 'type-graphql';
import ICreateUserProjectPayload from './types/createUserProjectPayload.args';
import IUserProject from './types/userProject.type';
import IUserProjectPayload from './types/userProjectPayload.args';
import UserProjectService from './userProject.service';

@Resolver(() => IUserProject)
export default class UserProjectResolver {
  // * CREATE
  @Mutation(() => IUserProject)
  async createUserProject(
    @Args() payload: ICreateUserProjectPayload,
  ): Promise<IUserProject> {
    return UserProjectService().createOneUserProject(payload);
  }

  // * EDIT
  @Mutation(() => IUserProject)
  async editUserProject(
    @Args() payload: IUserProjectPayload,
  ): Promise<IUserProject> {
    return UserProjectService().editOneUserProject(payload);
  }

  // * DELETE
  @Mutation(() => IUserProject)
  async deleteUserProject(
    @Arg('userId') userId: string,
    @Arg('projectId') projectId: string,
  ): Promise<IUserProject> {
    return UserProjectService().deleteOneUserProject(userId, projectId);
  }
}
