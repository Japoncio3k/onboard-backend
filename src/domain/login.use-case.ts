import { loginDatasource } from '../data/login.datasource';

interface LoginInput {
  email: string;
  password: string;
}

interface LoginSuccessResponse {
  token: string;
}

interface LoginFailureResponse {
  message: string;
}

export const loginUseCase = async (
  _: unknown,
  args: { userData: LoginInput },
): Promise<LoginSuccessResponse | LoginFailureResponse> => {
  const { foundUser } = await loginDatasource(args.userData);
  if (foundUser) {
    return {
      token: 'dfsgjhsfdghji', //generate random token
    };
  } else {
    return {
      message: 'Incorrect credentials',
    };
  }
};
