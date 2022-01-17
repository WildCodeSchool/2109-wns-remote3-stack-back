import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { buildSchema } from 'type-graphql';
import appContext from './utils/context/context';
import AuthResolver from './auth/auth.resolver';
import ProjectResolver from './models/project/project.resolver';
import TagResolver from './models/tag/tag.resolver';
import TaskResolver from './models/task/task.resolver';
import UserResolver from './models/user/user.resolver';
import CommentResolver from './models/comments/comment.resolver';
import NotificationResolver from './models/notification/notification.resolver';

async function createApolloServer() {
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
    ],
  });

  // Initialize the Apollo Server with the generated GraphQL schema
  return new ApolloServer({
    validationRules: [depthLimit(10)],
    schema,
    context: appContext,
  });
}

export default createApolloServer;
