import ProjectPrismaDto from './dto/projectDto.prisma';
import IProject from './types/project.type';
import IProjectPayload from './types/payload.type';

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
  async function createNewProject(payload: IProjectPayload): Promise<IProject> {
    const project = await ProjectPrismaDto().createProject(payload);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
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
