import { GraphQLError } from "graphql";
import {
  CreateUserInput,
  createUserUseCase,
} from "../domain/create-user.use-case";
import { isError } from "../utils/check-error.util";

export const createUserResolver = async (
  _: unknown,
  args: CreateUserInput,
  headers: { authorization: string }
) => {
  const response = await createUserUseCase(args, headers.authorization);
  if (isError(response)) {
    throw new GraphQLError(response.message);
  } else {
    return {
      user: response,
    };
  }
};
