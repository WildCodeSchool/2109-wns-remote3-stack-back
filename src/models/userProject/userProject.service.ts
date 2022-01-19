import UserProjectPrismaDto from './dto/userProjectDto.prisma';
import IUserProject from './types/userProject.type';
import IUserProjectPayload from './types/userProjectPayload.type';

export default function UserProjectService() {
  async function createOneUserProject(
    payload: IUserProjectPayload,
  ): Promise<IUserProject> {
    const userProject = await UserProjectPrismaDto().createOne(payload);
    if (!userProject) {
      throw new Error('Error while creating the UserProject');
    }
    return userProject;
  }

  return {
    createOneUserProject,
  };
}
