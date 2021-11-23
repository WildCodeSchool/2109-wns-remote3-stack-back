import 'reflect-metadata';
import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import IProject from './types/project.type';
import ProjectService from './project.service';
import IProjectPayload from './types/payload.type';

@Resolver(() => IProject)
export default class ProjectResolver {
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

  // * CREATE
  @Mutation(() => IProject)
  async createProject(@Args()payload: IProjectPayload):Promise<IProject> {
    return ProjectService().createNewProject(payload);
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
