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
  it('should create a new notification', async () => {
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

  it('should get all notifications', async () => {
    const query = gql`query GetAllNotifications {
      getAllNotifications {
        id
      }
    }`;

    const response = await server.executeOperation({ query });

    expect(Array.isArray(response.data?.getAllNotifications)).toBe(true);
  });

  it('should bet one notification', async () => {
    const oneNotifiactionById = gql`
    query GetAllNotifications($getNotificationByIdId: String!) {
      getNotificationByID(id: $getNotificationByIdId) {
        id
        message
        userId
        viewed
      }
    }
    `;

    const variables = {
      getNotificationByIdId: id,
    };

    const response = await server.executeOperation({
      query: oneNotifiactionById,
      variables,
    });

    const notifResponse = {
      message: 'coucou',
      userId: user.id,
      viewed: false,
    };

    expect(response.data?.getNotificationByID.id).toEqual(id);
    expect(response.data?.getNotificationByID).toHaveProperty('message', notifResponse.message);
    expect(response.data?.getNotificationByID).toHaveProperty('userId', notifResponse.userId);
    expect(response.data?.getNotificationByID).toHaveProperty('viewed', notifResponse.viewed);
  });

  it('should update the created notification', async () => {
    const updateNotifById = gql`
    mutation Mutation($updateNotificationId: String!, $message: String!, $userId: String!, $viewed: Boolean!) {
      updateNotification(id: $updateNotificationId, message: $message, userId: $userId, viewed: $viewed) {
        id
        message
      }
    }
    `;

    const variables = {
      updateNotificationId: id,
      message: 'updateMessage',
      userId: user.id,
      viewed: false,
    };
    const response = await server.executeOperation({
      query: updateNotifById,
      variables,
    });

    expect(response.data?.updateNotification.id).toEqual(id);
    expect(response.data?.updateNotification).toHaveProperty('message', variables.message);
  });

  it('should delete the created notification', async () => {
    const deleteNotifById = gql`
    mutation DeleteNotificationById($deleteNotificationByIdId: String!) {
      deleteNotificationById(id: $deleteNotificationByIdId) {
        id
      }
    }
    `;

    const variables = {
      deleteNotificationByIdId: id,
    };

    const response = await server.executeOperation({
      query: deleteNotifById,
      variables,
    });

    if (response.data?.deleteNotificationById.id) {
      isDeleted = false;
    }

    expect(isDeleted).toEqual(false);
  });
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
