import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-express';
import { exec } from 'child_process';
import createApolloServer from '../../apolloServer';

let server: ApolloServer;

beforeAll(async () => {
  server = await createApolloServer();
  process.env.IS_TEST = 'true';
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
        }
      }
    `;
    const variables = {
      subject: 'TaskTest',
      projectId: 'b45645d3-1410-4d11-b36c-e115db41b4ce',
      endDate: '2021-02-07T21:04:39.573Z',
      advancement: 'DONE',
      estimeeSpentTime: 5.0,
    };

    const response = await server.executeOperation({
      query: addTaskMutation,
      variables,
    });

    console.log(response.data?.createTask);
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

    console.log(response.data?.getAllTasks);

    // const response = await request('http://localhost:4000/graphql', query);

    // expect(Array.isArray(response.getAllTasks)).toBe(true);
  });
});
