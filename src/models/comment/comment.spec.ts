import { ApolloServer, gql } from 'apollo-server-express';
import { Project, Task, User } from '@prisma/client';
import { prisma } from '@utils/prisma';
import createApolloServer from '../../apolloServer';

let server: ApolloServer;
let user: User;
let task: Task;
let isDeleted: boolean;
let project: Project;
let id: string;

beforeAll(async () => {
  server = await createApolloServer();
  project = await prisma.project.create({
    data: {
      name: 'Test',
      status: 'DONE',
      endDate: '2021-02-07T21:04:39.573Z',
      estimeeSpentTime: 5.2,
    },
  });
  user = await prisma.user.create({
    data: {
      email: process.env.EMAIL_USER_TEST || '',
      password: process.env.PASSWORD_USER_TEST || '',
      firstName: 'usertest',
      lastName: 'usertest',
    },
  });
  task = await prisma.task.create({
    data: {
      subject: 'TaskTest',
      projectId: project.id,
      endDate: '2021-02-07T21:04:39.573Z',
      advancement: 'DONE',
      estimeeSpentTime: 5.0,
    },
  });
});

describe('Comments Resolver', () => {
  it('should create a new Comment', async () => {
    const taskAddMutation = gql`mutation CreateComment($text: String!, $userId: String!, $taskId: String!) {
            createComment(text: $text, userId: $userId, taskId: $taskId) {
              id
              text
              userId
              taskId
            }
          }`;

    const variables = {
      text: 'Ceci est un commentaire test',
      userId: user.id,
      taskId: task.id,
    };

    const response = await server.executeOperation({
      query: taskAddMutation,
      variables,
    });
    id = response.data?.createComment.id;

    expect(response.data?.createComment.id).toEqual(id);
    expect(response.data?.createComment).toHaveProperty('text', variables.text);
    expect(response.data?.createComment).toHaveProperty('userId', variables.userId);
    expect(response.data?.createComment).toHaveProperty('taskId', variables.taskId);
  });

  it('should get all comments', async () => {
    const query = gql`query Query {
        getAllComments {
          id
        }
      }`;

    const response = await server.executeOperation({ query });
    expect(Array.isArray(response.data?.getAllComments)).toBe(true);
  });

  it('should get one comment by id', async () => {
    const oneCommentQuery = gql`query Query($getCommentByIdId: String!) {
        getCommentByID(id: $getCommentByIdId) {
          id
          text
          userId
          taskId
        }
      }`;
    const variables = {
      getCommentByIdId: id,
    };

    const response = await server.executeOperation({
      query: oneCommentQuery,
      variables,
    });

    const commentResponse = {
      text: 'Ceci est un commentaire test',
      userId: user.id,
      taskId: task.id,
    };

    expect(response.data?.getCommentByID.id).toEqual(id);
    expect(response.data?.getCommentByID).toHaveProperty('text', commentResponse.text);
    expect(response.data?.getCommentByID).toHaveProperty('userId', commentResponse.userId);
    expect(response.data?.getCommentByID).toHaveProperty('taskId', commentResponse.taskId);
  });

  it('should update the created comment', async () => {
    const updateCommentQuery = gql`
    mutation Mutation($updateCommentId: String!, $text: String!, $userId: String!, $taskId: String!) {
        updateComment(id: $updateCommentId, text: $text, userId: $userId, taskId: $taskId) {
          id
          text
          userId
          taskId
        }
      }
      `;

    const variables = {
      updateCommentId: id,
      text: 'update test comment',
      userId: user.id,
      taskId: task.id,
    };
    const response = await server.executeOperation({
      query: updateCommentQuery,
      variables,
    });

    expect(response.data?.updateComment.id).toEqual(id);
    expect(response.data?.updateComment).toHaveProperty('text', variables.text);
    expect(response.data?.updateComment).toHaveProperty('userId', variables.userId);
    expect(response.data?.updateComment).toHaveProperty('taskId', variables.taskId);
  });

  it('should delete the created comment', async () => {
    const deleteCommentById = gql`mutation Mutation($deleteCommentByIdId: String!) {
        deleteCommentById(id: $deleteCommentByIdId) {
          id
        }
      }`;

    const variables = {
      deleteCommentByIdId: id,
    };

    const response = await server.executeOperation({
      query: deleteCommentById,
      variables,
    });

    if (response.data?.deleteCommentById) {
      isDeleted = false;
    }
    expect(isDeleted).toEqual(false);
  });
});

afterAll(async () => {
  if (isDeleted) {
    await prisma.comment.delete({
      where: { id },
    });
  }

  await prisma.user.delete({
    where: { id: user.id },
  });
  await prisma.task.delete({
    where: { id: task.id },
  });

  await prisma.project.delete({
    where: { id: project.id },
  });

  await prisma.$disconnect();
});
