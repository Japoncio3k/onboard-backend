import { GraphQLError } from "graphql";
import {
  UpdateUserInput,
  updateUserUseCase,
} from "../domain/update-user.use-case";
import { isError } from "../utils/check-error.util";

export const updateUserResolver = async (
  _: unknown,
  args: UpdateUserInput,
  headers: { authorization: string }
) => {
  const response = await updateUserUseCase(args, headers.authorization);
  if (isError(response)) {
    throw new GraphQLError(response.message);
  } else {
    if (response.affected === 0) {
      throw new GraphQLError("User not found");
    } else {
      return {
        code: 200,
      };
    }
  }
};
