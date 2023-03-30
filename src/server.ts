import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import { AppDataSource } from './data/data-source';
import { createUserUseCase } from './domain/create-user.use-case';
import { deleteUserUseCase } from './domain/delete-user.use-case';
import { loginUseCase } from './domain/login.use-case';
import { updateUserUseCase } from './domain/update-user.ues-case';
import { typeDefs } from './typeDefs';

const startDB = async () => {
  console.log('Initializing database');
  await AppDataSource.initialize();
  console.log('Database Initialized');
};

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
  },
  Mutation: {
    createUser: createUserUseCase,
    deleteUser: deleteUserUseCase,
    updateUser: updateUserUseCase,
    login: loginUseCase,
  },
};

export const startServer = async () => {
  await startDB();

  console.info('Starting server');

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      authorization: req.headers.authorization,
    }),
  });

  const port = 3000;
  const { url } = await server.listen({ port });

  console.log(`Your server is present at ${url}`);
};

startServer();
