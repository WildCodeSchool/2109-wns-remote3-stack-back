// import { ApolloServer, gql } from 'apollo-server-express';
import { create } from 'domain';
import { request, gql } from 'graphql-request';
import { app } from '../../server';
import appContext from '../../utils/context/context';
import TaskResolver from './task.resolver';

// let server: any;

// beforeAll(async () => {
//   server = await create();
// });

// const server = new ApolloServer({
//   resolvers: { TaskResolver },
//   context: appContext,
// });

describe('Task Resolver', () => {
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
    // const response = await server.executeOperation({ query: data.query });

    const response = await request('http://localhost:4000/graphql', query);

    expect(Array.isArray(response.getAllTasks)).toBe(true);
  });
});
