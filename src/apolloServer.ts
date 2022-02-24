import { ApolloServer } from 'apollo-server-express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
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

  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
  }, {
    server: httpServer,
    path: '/graphql',
  });

  // Initialize the Apollo Server with the generated GraphQL schema
  return new ApolloServer({
    validationRules: [depthLimit(10)],
    schema,
    context: appContext,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    }],
  });
}

export default createApolloServer;
