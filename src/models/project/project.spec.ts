import { ApolloServer, gql } from 'apollo-server-express';
import { prisma } from '@utils/prisma';
// import createApolloServer from '../../apolloServer';

let server: ApolloServer;

let id: string;
let isDeleted: boolean;

beforeAll(async () => {
  // TODO: fix apollo server with subscription system
  // server = await createApolloServer();
});

describe('Project Resolver', () => {
  // * CREATE PROJECT TEST
  it('should create a new project', async () => {
    const addProjectMutation = gql`
      mutation Mutation(
        $status: String!
        $startDate: String!
        $endDate: String!
        $estimeeSpentTime: Float!
      ) {
        createProject(
          status: $status
          startDate: $startDate
          endDate: $endDate
          estimeeSpentTime: $estimeeSpentTime
        ) {
          id
          status
          startDate
          endDate
          estimeeSpentTime
        }
      }
    `;

    const variables = {
      status: 'DONE',
      startDate: '2021-02-07T21:04:39.573Z',
      endDate: '2021-02-07T21:04:39.573Z',
      estimeeSpentTime: 5.0,
    };

    const response = await server.executeOperation({
      query: addProjectMutation,
      variables,
    });

    id = response.data?.createProject.id;
    expect(response.data?.createProject.id).toEqual(id);
    expect(response.data?.createProject).toHaveProperty('status', variables.status);
    expect(response.data?.createProject).toHaveProperty('startDate', '1612731879573');
    expect(response.data?.createProject).toHaveProperty('endDate', '1612731879573');
    expect(response.data?.createProject).toHaveProperty('estimeeSpentTime', variables.estimeeSpentTime);
  });

  // * GET ALL PROJECTS TEST
  it('should get all projects', async () => {
    const query = gql`
    query Query {
      getAllProjects {
        id
        status
        startDate
        endDate
        estimeeSpentTime
      }
    }
    `;
    const response = await server.executeOperation({ query });

    expect(Array.isArray(response.data?.getAllProjects)).toBe(true);
  });

  // * GET ONE PROJECT TEST
  it('should get one project', async () => {
    const oneProjectQuery = gql`
    query Query($getProjectByIdId: String!) {
        getProjectByID(id: $getProjectByIdId) {
          id
          status
          startDate
          endDate
          estimeeSpentTime
        }
      }
    `;

    const variables = {
      getProjectByIdId: id,
    };
    const response = await server.executeOperation({
      query: oneProjectQuery,
      variables,
    });

    const projectResponse = {
      updateProjectById: id,
      status: 'DONE',
      startDate: '1612731879573',
      endDate: '1612731879573',
      estimeeSpentTime: 5.0,
    };

    expect(response.data?.getProjectByID).toHaveProperty('id', id);
    expect(response.data?.getProjectByID).toHaveProperty('status', projectResponse.status);
    expect(response.data?.getProjectByID).toHaveProperty('startDate', projectResponse.startDate);
    expect(response.data?.getProjectByID).toHaveProperty('endDate', projectResponse.endDate);
    expect(response.data?.getProjectByID).toHaveProperty('estimeeSpentTime', projectResponse.estimeeSpentTime);
  });

  // * UPDATE ONE PROJECT TEST
  it('should update the created project', async () => {
    const updateProjectMutation = gql`
    mutation Mutation($updateProjectId: String!, $status: String!, $startDate: String!, $endDate: String!, $estimeeSpentTime: Float!) {
        updateProject(id: $updateProjectId, status: $status, startDate: $startDate, endDate: $endDate, estimeeSpentTime: $estimeeSpentTime) {
          id
          status
          startDate
          endDate
          estimeeSpentTime
        }
      }
      `;
    const variables = {
      updateProjectId: id,
      status: 'DONE',
      startDate: '2021-02-07T21:04:39.573Z',
      endDate: '2021-02-07T21:04:39.573Z',
      estimeeSpentTime: 6.3,
    };

    const response = await server.executeOperation({
      query: updateProjectMutation,
      variables,
    });

    expect(response.data?.updateProject).toHaveProperty('status', variables.status);
    expect(response.data?.updateProject).toHaveProperty('startDate', '1612731879573');
    expect(response.data?.updateProject).toHaveProperty('endDate', '1612731879573');
    expect(response.data?.updateProject).toHaveProperty('estimeeSpentTime', variables.estimeeSpentTime);
  });

  // * DELETE ONE PROJECT TEST
  it('should delete the created project', async () => {
    const deleteProjectById = gql`
    mutation Mutation($deleteProjectByIdId: String!) {
        deleteProjectById(id: $deleteProjectByIdId) {
          id
        }
      }
    `;

    const variables = {
      deleteProjectByIdId: id,
    };

    const response = await server.executeOperation({
      query: deleteProjectById,
      variables,
    });

    if (response.data?.deleteProjectById.id) {
      isDeleted = false;
    }
    expect(isDeleted).toEqual(false);
  });

  afterAll(async () => {
    if (isDeleted) {
      await prisma.project.delete({
        where: { id },
      });
    }
    await prisma.$disconnect();
  });
});
