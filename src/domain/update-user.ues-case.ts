import { updateUserDatasource } from '../data/update-user.datasource';
import { CommonResponse } from '../model/response.model';
import { verifyToken } from '../utils/authentication.util';

interface UpdateUserInput {
  id: number;
  email?: string;
  password?: string;
  birthdate?: string;
  name?: string;
}

export const updateUserUseCase = async (
  _: unknown,
  args: { userData: UpdateUserInput },
  headers: { authorization: string },
): Promise<CommonResponse> => {
  return verifyToken(headers.authorization, async () => {
    await updateUserDatasource(args.userData);
    return {
      message: 'User deleted successfully',
      code: 'success',
    };
  });
};
