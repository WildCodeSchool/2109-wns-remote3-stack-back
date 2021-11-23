import { ApolloServer } from 'apollo-server-express';
import { ApolloError } from 'apollo-server-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import dotenv from 'dotenv';
import { buildSchema } from 'type-graphql';
import rateLimit from 'express-rate-limit';
import UserResolver from './models/user/user.resolver';
import TaskResolver from './models/task/task.resolver';
import ProjectResolver from './models/project/project.resolver';

async function startServer() {
  // Get environments variables from .env file
  dotenv.config();
  // Initialize server port
  const PORT = process.env.PORT || 4000;
  const HOST = process.env.HOST || 'localhost';

  // Using TypeGraphQL, build GraphQL schema automatically
  const schema = await buildSchema({
    resolvers: [UserResolver, TaskResolver, ProjectResolver],
  });

  // Initialize the Apollo Server with the generated GraphQL schema
  const server = new ApolloServer({
    validationRules: [depthLimit(10)],
    schema,
  });

  // Initialize Express and middlewares
  const app = express();
  app.use(cookieParser()); // Cookie Parser middleware to read cookies from the navigator
  app.use(compression()); // Compress all responses for better performance

  // Basic rate limiter to prevent DDOS attacks
  const rateLimiter = rateLimit({
    windowMs: 10 * 1000, // ten seconds
    max: 50, // limit each IP address to 50 requests / 10 seconds
    message: { message: 'Too many requests, please try again later.', status: 429 },
  });

  // Setup the server endpoint to ${serverAdress}/graphql with the rate limiter
  app.use('/graphql', rateLimiter);
  app.use(express.json()); // Body parser

  // * Startup server
  try {
    await server.start();
    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://studio.apollographql.com'],
      },
    });

    app.listen({ port: PORT, host: HOST }, () => {
      // TODO: replace with custom winston logger
      console.log('Server ready', { host: HOST, port: PORT });
    });
  } catch (error) {
    throw new ApolloError('An error happened', undefined, { error });
  }
}

startServer();
