import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { buildSchema } from 'type-graphql';
import appContext from '@utils/context/context';
import AuthResolver from '@auth/auth.resolver';
import ProjectResolver from '@project/project.resolver';
import TagResolver from '@tag/tag.resolver';
import TaskResolver from '@task/task.resolver';
import UserResolver from '@user/user.resolver';
import CommentResolver from '@comment/comment.resolver';
import NotificationResolver from '@notification/notification.resolver';
import UserProjectResolver from '@userProject/userProject.resolver';
import { Server } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

async function createApolloServer(httpServer: Server) {
  // Using TypeGraphQL, build GraphQL schema automatically
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      AuthResolver,
      TagResolver,
      TaskResolver,
      ProjectResolver,
      CommentResolver,
      NotificationResolver,
      UserProjectResolver,
    ],
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer);

  // Initialize the Apollo Server with the generated GraphQL schema
  return new ApolloServer({
    validationRules: [depthLimit(10)],
    schema,
    context: appContext,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
}

export default createApolloServer;
