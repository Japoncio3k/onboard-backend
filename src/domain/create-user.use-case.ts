import { createUserDatasource } from "../data/create-user.datasource";
import { AppError } from "../model/error.model";
import { UserModel } from "../model/user.model";
import { verifyToken } from "../utils/verify-token.util";

interface UserInput {
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

export interface CreateUserInput {
  userData: UserInput;
}

export const createUserUseCase = async (
  args: CreateUserInput,
  authorization: string
): Promise<UserModel | AppError> => {
  const tokenResponse = verifyToken(authorization);
  if (tokenResponse.success) {
    return await createUserDatasource(args.userData);
  } else {
    return {
      message: tokenResponse.message,
    };
  }
};
