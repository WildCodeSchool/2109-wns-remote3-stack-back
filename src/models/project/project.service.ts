import ProjectPrismaDto from '@project/dto/projectDto.prisma';
import IProject from '@project/types/project.type';
import IProjectPayload from '@project/types/payload.args';
import UserProjectService from '@userProject/userProject.service';
import UserService from '@user/user.service';
import { IContext } from '@utils/context/interface/context.interface';
import NotificationService from '@notification/notification.service';
import { PubSubEngine } from 'type-graphql';

export default function ProjectService() {
  // ** READ
  async function allProjects(): Promise<IProject[]> {
    const projects = await ProjectPrismaDto().all();
    if (!projects) {
      throw new Error('No projects found');
    }
    return projects;
  }

  async function findById(id: string): Promise<IProject> {
    const project = await ProjectPrismaDto().oneById({ id });
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }
  // * CREATE
  async function createNewProject(
    payload: IProjectPayload,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<IProject> {
    const project = await ProjectPrismaDto().createProject(payload);
    if (!project) {
      throw new Error('Project not found');
    }
    console.log('Trying to create userProject');
    const userProject = await UserProjectService().createOneUserProject({
      userId: context.userId || '',
      projectId: project.id,
      projectRole: 'PROJECT_MANAGER',
    });
    if (!userProject) {
      console.log('UserProject error');
      throw new Error('UserProject error');
    }
    const projectWithManager = await ProjectPrismaDto().oneById({ id: project.id });
    if (!projectWithManager) {
      console.log('Project not found');
      throw new Error('Project not found');
    }
    console.log('Project created');
    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'ADDED',
      modifiedObjectName: projectWithManager.name,
      modifiedObjectId: projectWithManager.id,
      type: 'PROJECT',
    }, projectWithManager.id);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return projectWithManager;
  }

  // * UPDATE
  async function updateProjectById(
    payload: IProjectPayload,
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<IProject> {
    const project = await ProjectPrismaDto().updateProject(payload, { id });
    if (!project) {
      throw new Error('Project not found');
    }
    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'EDITED',
      modifiedObjectName: project.name,
      modifiedObjectId: project.id,
      type: 'PROJECT',
    }, project.id);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return project;
  }

  // ** DELETE
  async function deleteById(
    id: string,
    context: IContext,
    pubSub: PubSubEngine,
  ): Promise<boolean> {
    // ? We get the project before the deletion so we can send the notification correctly, as
    // ? we are doing a Prisma transaction for the project deletion
    const projectBeforeDeletion = await ProjectPrismaDto().oneById({ id });
    const project = await ProjectPrismaDto().deleteOneById({ id });
    if (!(projectBeforeDeletion && project)) {
      throw new Error('Project not found');
    }

    const user = await UserService().findById(context.userId || '');

    const notification = await NotificationService().createNewNotification({
      editorName: user.firstName,
      editorId: context.userId || '',
      actionType: 'DELETED',
      modifiedObjectName: projectBeforeDeletion.name,
      modifiedObjectId: projectBeforeDeletion.id,
      type: 'PROJECT',
    }, projectBeforeDeletion.id);

    await pubSub.publish('NOTIFICATIONS', notification);
    await pubSub.publish('USER_NOTIFICATIONS', notification);

    return project;
  }

  return {
    allProjects,
    findById,
    deleteById,
    createNewProject,
    updateProjectById,
  };
}
