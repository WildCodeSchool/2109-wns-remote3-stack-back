import { create } from 'domain';
import { request, gql } from 'graphql-request';
import { app } from '../../server';
import appContext from '../../utils/context/context';
import TaskResolver from './task.resolver';
import createApolloServer from "../../apolloServer";
import {ApolloServer} from "apollo-server-express";

let server: ApolloServer;

beforeAll(async () => {
  server = await createApolloServer();
});

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
    const response = await server.executeOperation({ query: query });

    console.log(response);

    // const response = await request('http://localhost:4000/graphql', query);


    // expect(Array.isArray(response.getAllTasks)).toBe(true);
  });
});
