import { deleteUserDatasource } from '../data/delete-user.datasource';
import { CommonResponse } from '../model/response.model';
import { verifyToken } from '../utils/authentication.util';

interface DeleteUserInput {
  id: number;
}

export const deleteUserUseCase = async (
  _: unknown,
  args: { userData: DeleteUserInput },
  headers: { authorization: string },
): Promise<CommonResponse> => {
  return verifyToken(headers.authorization, async () => {
    await deleteUserDatasource(args.userData);
    return {
      code: 'success',
      message: 'User deleted successfully',
    };
  });
};
