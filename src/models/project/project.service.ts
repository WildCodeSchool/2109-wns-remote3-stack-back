import ProjectPrismaDto from '@project/dto/projectDto.prisma';
import IProject from '@project/types/project.type';
import IProjectPayload from '@project/types/payload.type';
import UserProjectService from '@userProject/userProject.service';

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
  async function createNewProject(payload: IProjectPayload, userId: string): Promise<IProject> {
    const project = await ProjectPrismaDto().createProject(payload);
    if (!project) {
      throw new Error('Project not found');
    }
    const userProject = await UserProjectService().createOneUserProject({
      userId,
      projectId: project.id,
      projectRole: 'PROJECT_MANAGER',
    });
    if (!userProject) {
      throw new Error('UserProject error');
    }
    const projectWithManager = await ProjectPrismaDto().oneById({ id: project.id });
    if (!projectWithManager) {
      throw new Error('Project not found');
    }
    return projectWithManager;
  }

  // * UPDATE
  async function updateProjectById(payload: IProjectPayload, id: string): Promise<IProject> {
    const project = await ProjectPrismaDto().updateProject(payload, { id });
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  // ** DELETE
  async function deleteById(id: string): Promise<IProject> {
    const project = await ProjectPrismaDto().deleteOneById({ id });
    if (!project) {
      throw new Error('Project not found');
    }
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
