import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import IProject from '@project/types/project.type';
import IProjectPayload from '@project/types/payload.type';
import ProjectService from '@project/project.service';

@Resolver(() => IProject)
export default class ProjectResolver {
  // * READ
  @Query(() => [IProject])
  async getAllProjects(): Promise<IProject[]> {
    return ProjectService().allProjects();
  }

  @Query(() => IProject)
  async getProjectByID(
    @Arg('id') id: string,
  ): Promise<IProject> {
    return ProjectService().findById(id);
  }

  // * CREATE
  @Mutation(() => IProject)
  async createProject(
    @Args()payload: IProjectPayload,
    @Arg('userId') userId: string,
  ):Promise<IProject> {
    return ProjectService().createNewProject(payload, userId);
  }

  // * UPDATE
  @Mutation(() => IProject)
  async updateProject(@Args()payload: IProjectPayload, @Arg('id') id: string):Promise<IProject> {
    return ProjectService().updateProjectById(payload, id);
  }

  // * DELETE
  @Mutation(() => IProject)
  async deleteProjectById(
    @Arg('id') id: string,
  ): Promise<IProject> {
    return ProjectService().deleteById(id);
  }
}
