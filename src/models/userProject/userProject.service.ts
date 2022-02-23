import UserProjectPrismaDto from './dto/userProjectDto.prisma';
import IUserProject from './types/userProject.type';
import IUserProjectPayload from './types/userProjectPayload.args';

export default function UserProjectService() {
  async function findUsersByProjectId(projectId: string): Promise<IUserProject[]> {
    const userProjects = await UserProjectPrismaDto().allByProjectId(projectId);
    if (!userProjects) {
      throw new Error('No users found');
    }
    return userProjects;
  }

  async function createOneUserProject(
    payload: IUserProjectPayload,
  ): Promise<IUserProject> {
    const userProject = await UserProjectPrismaDto().createOne(payload);
    if (!userProject) {
      throw new Error('Error while creating the UserProject');
    }
    return userProject;
  }

  async function editOneUserProject(
    payload: IUserProjectPayload,
  ): Promise<IUserProject> {
    const userProject = await UserProjectPrismaDto().editOne(payload);
    if (!userProject) {
      throw new Error('UserProject not found');
    }
    return userProject;
  }

  async function deleteOneUserProject(
    userId: string, projectId: string,
  ): Promise<IUserProject> {
    const userProject = await UserProjectPrismaDto().deleteOne(userId, projectId);
    if (!userProject) {
      throw new Error('UserProject not found');
    }
    return userProject;
  }

  return {
    findUsersByProjectId,
    createOneUserProject,
    editOneUserProject,
    deleteOneUserProject,
  };
}
