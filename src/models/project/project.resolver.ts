import 'reflect-metadata';
import {
  Resolver, Query, Arg, Mutation,
} from 'type-graphql';
import IProject from './types/project.type';
import ProjectService from './project.service';

@Resolver(() => IProject)
export default class UserResolver {
  // CREATE method is handled in the Auth Models

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

  // * UPDATE

  // * DELETE
  @Mutation(() => IProject)
  async deleteProjectById(
    @Arg('id') id: string,
  ): Promise<IProject> {
    return ProjectService().deleteById(id);
  }
}
