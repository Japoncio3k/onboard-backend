import { deleteUserDatasource } from "../data/delete-user.datasource";
import { CommonResponse } from "../model/response.model";
import { verifyToken } from "../utils/authentication.util";

export interface DeleteUserInput {
  userData: { id: number };
}

export const deleteUserUseCase = async (
  _: unknown,
  args: DeleteUserInput,
  headers: { authorization: string }
): Promise<void> => {
  return verifyToken(headers.authorization, async () => {
    await deleteUserDatasource(args.userData);
  });
};
