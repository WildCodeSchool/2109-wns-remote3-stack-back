import { ApolloServer, gql } from 'apollo-server-express';
import { User } from '@prisma/client';
import { prisma } from '../../utils/prisma/prisma-client';
import createApolloServer from '../../apolloServer';

let server: ApolloServer;

let id: string;
let isDeleted: boolean;
let user: User;

beforeAll(async () => {
  server = await createApolloServer();

  user = await prisma.user.create({
    data: {
      email: 'toto@test.com',
      password: 'toto',
      firstName: 'jacques',
      lastName: 'celere',
    },
  });
});
describe('Notification Resolver', () => {
  it.only('should create a new notification', async () => {
    const addNotificationMutation = gql`
    mutation CreateNotification($message: String!, $userId: String!, $viewed: Boolean!) {
        createNotification(message: $message, userId: $userId, viewed: $viewed) {
          id
          message
          userId
          viewed
        }
      }
    `;

    const variables = {
      message: 'coucou',
      userId: user.id,
      viewed: false,
    };

    const response = await server.executeOperation({
      query: addNotificationMutation,
      variables,
    });

    id = response.data?.createNotification.id;

    expect(response.data?.createNotification.id).toEqual(id);
    expect(response.data?.createNotification).toHaveProperty('message', variables.message);
    expect(response.data?.createNotification).toHaveProperty('userId', variables.userId);
    expect(response.data?.createNotification).toHaveProperty('viewed', variables.viewed);
  });

  afterAll(async () => {
    if (isDeleted) {
      await prisma.notification.delete({
        where: { id },
      });
    }
    await prisma.user.delete({
      where: { id: user.id },

    });
    await prisma.$disconnect();
  });
});
