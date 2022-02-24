import {
  Resolver, Query, Arg, Mutation, Args, Ctx, PubSub, PubSubEngine,
} from 'type-graphql';
import IProject from '@project/types/project.type';
import IProjectPayload from '@project/types/payload.args';
import ProjectService from '@project/project.service';
import { IContext } from '@utils/context/interface/context.interface';

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
    @PubSub() pubSub: PubSubEngine,
    @Ctx() context: IContext,
  ):Promise<IProject> {
    return ProjectService().createNewProject(payload, context, pubSub);
  }

  // * UPDATE
  @Mutation(() => IProject)
  async updateProject(
    @Args()payload: IProjectPayload,
    @Arg('id') id: string,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() context: IContext,
  ):Promise<IProject> {
    return ProjectService().updateProjectById(payload, id, context, pubSub);
  }

  // * DELETE
  @Mutation(() => Boolean)
  async deleteProjectById(
    @Arg('id') id: string,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() context: IContext,
  ): Promise<boolean> {
    return ProjectService().deleteById(id, context, pubSub);
  }
}
