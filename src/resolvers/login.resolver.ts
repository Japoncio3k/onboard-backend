import { GraphQLError } from "graphql";
import { LoginInput, loginUseCase } from "../domain/login.use-case";
import { isError } from "../utils/check-error.util";

export const loginResolver = async (_: unknown, args: LoginInput) => {
  const response = await loginUseCase(args);
  if (isError(response)) {
    throw new GraphQLError(response.message);
  } else {
    return response;
  }
};
