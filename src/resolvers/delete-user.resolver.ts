import { GraphQLError } from "graphql";
import {
  DeleteUserInput,
  deleteUserUseCase,
} from "../domain/delete-user.use-case";
import { isError } from "../utils/check-error.util";

export const deleteUserResolver = async (
  _: unknown,
  args: DeleteUserInput,
  headers: { authorization: string }
) => {
  const response = await deleteUserUseCase(args, headers.authorization);
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
