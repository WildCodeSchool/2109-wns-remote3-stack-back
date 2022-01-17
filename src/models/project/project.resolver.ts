import 'reflect-metadata';
import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import {
  Project,
} from '@prisma/client';
import IProject from './types/project.type';
import ProjectService from './project.service';
import IProjectPayload from './types/payload.type';

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
  async createProject(@Args()payload: IProjectPayload):Promise<Project> {
    return ProjectService().createNewProject(payload);
  }

  // * UPDATE
  @Mutation(() => IProject)
  async updateProject(@Args()payload: IProjectPayload, @Arg('id') id: string):Promise<Project> {
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
