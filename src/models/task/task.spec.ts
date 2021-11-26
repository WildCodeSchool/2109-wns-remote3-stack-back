import { ApolloServer, gql } from 'apollo-server-express';
import { Project } from '@prisma/client';
import { prisma } from '../../utils/prisma/prisma-client';
import createApolloServer from '../../apolloServer';

let server: ApolloServer;

let id: string;
let isDeleted: boolean;
let project: Project;

beforeAll(async () => {
  server = await createApolloServer();
  project = await prisma.project.create({
    data: {
      status: 'DONE',
      endDate: '2021-02-07T21:04:39.573Z',
      estimeeSpentTime: 5.2,
    },
  });
});
describe('Task Resolver', () => {
  it('should create a new task', async () => {
    const addTaskMutation = gql`
      mutation Mutation(
        $subject: String!
        $projectId: String!
        $endDate: String!
        $advancement: String!
        $estimeeSpentTime: Float!
      ) {
        createTask(
          subject: $subject
          projectId: $projectId
          endDate: $endDate
          advancement: $advancement
          estimeeSpentTime: $estimeeSpentTime
        ) {
          id
          subject
          projectId
          endDate
          advancement
          estimeeSpentTime
        }
      }
    `;

    const variables = {
      subject: 'TaskTest',
      projectId: project.id,
      endDate: '2021-02-07T21:04:39.573Z',
      advancement: 'DONE',
      estimeeSpentTime: 5.0,
    };

    const response = await server.executeOperation({
      query: addTaskMutation,
      variables,
    });

    id = response.data?.createTask.id;

    expect(response.data?.createTask.id).toEqual(id);
    expect(response.data?.createTask).toHaveProperty('subject', variables.subject);
    expect(response.data?.createTask).toHaveProperty('projectId', variables.projectId);
    expect(response.data?.createTask).toHaveProperty('endDate', '1612731879573');
    expect(response.data?.createTask).toHaveProperty('advancement', variables.advancement);
    expect(response.data?.createTask).toHaveProperty('estimeeSpentTime', variables.estimeeSpentTime);
  });

  it('should get all task', async () => {
    const query = gql`
      query Query {
        getAllTasks {
          id
          subject
          projectId
          users {
            id
          }
          startDate
          endDate
          estimeeSpentTime
        }
      }
    `;
    const response = await server.executeOperation({ query });

    expect(Array.isArray(response.data?.getAllTasks)).toBe(true);
  });

  it('should get one', async () => {
    const oneTaskQuery = gql`
    query Query($getTaskByIdId: String!) {
      getTaskByID(id: $getTaskByIdId) {
        id
        subject
        projectId
        startDate
        endDate
        estimeeSpentTime
        advancement
      }
    }
    `;

    const variables = {
      getTaskByIdId: id,
    };
    const response = await server.executeOperation({
      query: oneTaskQuery,
      variables,
    });

    const taskResponse = {
      updateTaskByIdId: id,
      subject: 'TaskTest',
      projectId: project.id,
      endDate: '1612731879573',
      advancement: 'DONE',
      estimeeSpentTime: 5.0,
    };

    expect(response.data?.getTaskByID).toHaveProperty('id', id);
    expect(response.data?.getTaskByID).toHaveProperty('subject', taskResponse.subject);
    expect(response.data?.getTaskByID).toHaveProperty('projectId', taskResponse.projectId);
    expect(response.data?.getTaskByID).toHaveProperty('endDate', taskResponse.endDate);
    expect(response.data?.getTaskByID).toHaveProperty('advancement', taskResponse.advancement);
    expect(response.data?.getTaskByID).toHaveProperty('estimeeSpentTime', taskResponse.estimeeSpentTime);
  });

  it('should update the created task', async () => {
    const updateTaskMutation = gql`
    mutation UpdateProject($updateTaskByIdId: String!, $subject: String!, $projectId: String!, $endDate: String!, $advancement: String!, $estimeeSpentTime: Float!) {
      updateTaskById(id: $updateTaskByIdId, subject: $subject, projectId: $projectId, endDate: $endDate, advancement: $advancement, estimeeSpentTime: $estimeeSpentTime) {
        id
        subject
        projectId
        users {
          id
          email
        }
        startDate
        endDate
        estimeeSpentTime
        advancement
        comments {
          id
          text
        }
        tags {
          id
          label
        }
      }
    }
      `;
    const variables = {
      updateTaskByIdId: id,
      subject: 'TaskTestUpdated',
      projectId: project.id,
      endDate: '2021-02-07T21:04:39.573Z',
      advancement: 'TO_DO',
      estimeeSpentTime: 6.3,
    };

    const response = await server.executeOperation({
      query: updateTaskMutation,
      variables,
    });

    expect(response.data?.updateTaskById).toHaveProperty('subject', variables.subject);
    expect(response.data?.updateTaskById).toHaveProperty('advancement', variables.advancement);
    expect(response.data?.updateTaskById).toHaveProperty('estimeeSpentTime', variables.estimeeSpentTime);
  });

  it('should delete the created task', async () => {
    const deleteTaskById = gql`
    mutation Mutation($deleteTaskByIdId: String!) {
      deleteTaskById(id: $deleteTaskByIdId) {
        id
      }
    }
    `;

    const variables = {
      deleteTaskByIdId: id,
    };

    const response = await server.executeOperation({
      query: deleteTaskById,
      variables,
    });

    if (response.data?.deleteTaskById.id) {
      isDeleted = false;
    }
    expect(isDeleted).toEqual(false);
  });

  afterAll(async () => {
    if (isDeleted) {
      await prisma.task.delete({
        where: { id },
      });
    }
    await prisma.project.delete({
      where: { id: project.id },

    });
    await prisma.$disconnect();
  });
});
