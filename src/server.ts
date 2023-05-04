import { ApolloServer } from "apollo-server";
import { GraphQLError } from "graphql";
import "reflect-metadata";
import { AppDataSource } from "./data/data-source";
import {
  CreateUserInput,
  createUserUseCase,
} from "./domain/create-user.use-case";
import {
  DeleteUserInput,
  deleteUserUseCase,
} from "./domain/delete-user.use-case";
import { LoginInput, loginUseCase } from "./domain/login.use-case";
import {
  UpdateUserInput,
  updateUserUseCase,
} from "./domain/update-user.use-case";
import {
  UpsertUserActions,
  UpsertUserInput,
  upsertUserUseCase,
} from "./domain/upsert-user.use-case";
import { typeDefs } from "./typeDefs";

const startDB = async () => {
  console.log("Initializing database");
  await AppDataSource.initialize();
  console.log("Database Initialized");
};

const resolvers = {
  Query: {
    hello: () => `Hello World!`,
  },
  Mutation: {
    createUser: async (
      _: unknown,
      args: CreateUserInput,
      headers: { authorization: string }
    ) => {
      return {
        ...(await createUserUseCase(_, args, headers)),
        message: "User created successfully",
      };
    },
    deleteUser: async (
      _: unknown,
      args: DeleteUserInput,
      headers: { authorization: string }
    ) => {
      await deleteUserUseCase(_, args, headers);
      return {
        message: "User deleted successfully",
      };
    },
    updateUser: async (
      _: unknown,
      args: UpdateUserInput,
      headers: { authorization: string }
    ) => {
      const updateResult = await updateUserUseCase(_, args, headers);
      if (updateResult.affected === 0) {
        throw new GraphQLError("User not found");
      }
      return {
        message: "User updated successfully",
      };
    },
    login: async (_: unknown, args: LoginInput) => {
      return {
        ...(await loginUseCase(_, args)),
        message: "Logged in successfully",
      };
    },
    upsertUser: async (
      _: unknown,
      args: UpsertUserInput,
      headers: { authorization: string }
    ) => {
      const upsertResult = await upsertUserUseCase(_, args, headers);
      if (upsertResult.action === UpsertUserActions.Create) {
        return {
          message: "User created successfully",
        };
      } else {
        return {
          message: "User updated successfully",
        };
      }
    },
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
