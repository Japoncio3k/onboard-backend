import { ApolloServer } from "apollo-server";
import { GraphQLError } from "graphql";
import "reflect-metadata";
import { AppDataSource } from "./data/data-source";
import {
  createUserResolver,
  deleteUserResolver,
  loginResolver,
  updateUserResolver,
  upsertUserResolver,
} from "./resolvers";
import { typeDefs } from "./typeDefs";

const startDB = async () => {
  console.log("Initializing database");
  await AppDataSource.initialize();
  console.log("Database Initialized");
};

const resolvers = {
  Mutation: {
    createUser: createUserResolver,
    deleteUser: deleteUserResolver,
    updateUser: updateUserResolver,
    login: loginResolver,
    upsertUser: upsertUserResolver,
  },
};

export const startServer = async () => {
  await startDB();

  console.info("Starting server");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      authorization: req.headers.authorization,
    }),
    formatError: (error: GraphQLError) => {
      return { ...error };
    },
  });

  const port = 3000;
  const { url } = await server.listen({ port });

  console.log(`Your server is present at ${url}`);
};

startServer();
