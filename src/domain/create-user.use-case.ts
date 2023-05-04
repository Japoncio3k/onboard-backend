import { createUserDatasource } from "../data/create-user.datasource";
import { CommonResponse } from "../model/response.model";
import { UserOutput } from "../model/user-output.model";
import { verifyToken } from "../utils/authentication.util";

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
  _: unknown,
  args: CreateUserInput,
  headers: { authorization: string }
): Promise<UserOutput> => {
  return verifyToken<UserOutput>(headers.authorization, async () => {
    const user = await createUserDatasource(args.userData);
    return {
      user,
    };
  });
};
