import { createUserDatasource } from '../data/create-user.datasource';
import { CommonResponse } from '../model/response.model';
import { verifyToken } from '../utils/authentication.util';

interface UserOutput extends CommonResponse {
  user: {
    name: string;
    email: string;
    id: number;
    birthdate: string;
  };
}

interface UserInput {
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

interface CreateUserInput {
  userData: UserInput;
}

export const createUserUseCase = async (
  _: unknown,
  args: CreateUserInput,
  headers: { authorization: string },
): Promise<UserOutput | CommonResponse> => {
  return verifyToken<UserOutput>(headers.authorization, async () => {
    const user = await createUserDatasource(args.userData);
    return {
      user,
      code: 'success',
      message: 'User created successfully',
    };
  });
};
