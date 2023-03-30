import { addHours } from 'date-fns';
import { sign } from 'jsonwebtoken';
import { loginDatasource } from '../data/login.datasource';
import { CommonResponse } from '../model/response.model';

interface LoginInput {
  email: string;
  password: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  birthdate: string;
}

interface LoginSuccessResponse extends CommonResponse {
  loginData: {
    token: string;
    user: UserData;
  };
}

export const loginUseCase = async (
  _: unknown,
  args: { userData: LoginInput },
): Promise<LoginSuccessResponse | CommonResponse> => {
  const { userList } = await loginDatasource(args.userData);

  if (userList.length > 0) {
    return {
      loginData: {
        token: sign(
          { createdAt: new Date(), expiresAt: addHours(new Date(), 1), userRole: userList[0].role },
          'astiydno2mquhzk',
        ),
        user: {
          ...userList[0],
        },
      },
      message: 'Logged in successfully',
      code: 'success',
    };
  } else {
    return {
      code: 'login.incorrectCredentials',
      message: 'Incorrect credentials',
    };
  }
};
