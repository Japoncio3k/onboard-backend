import { GraphQLError } from "graphql";
import { UpdateResult } from "typeorm";
import {
  UpsertUserActions,
  UpsertUserInput,
  upsertUserUseCase,
} from "../domain/upsert-user.use-case";
import { isError } from "../utils/check-error.util";

export const upsertUserResolver = async (
  _: unknown,
  args: UpsertUserInput,
  headers: { authorization: string }
) => {
  const response = await upsertUserUseCase(args, headers.authorization);
  if (isError(response)) {
    throw new GraphQLError(response.message);
  } else {
    return response;
  }
};

const isUpdatedResult = (object: any): object is UpdateResult => {
  return "affected" in object;
};
