import { User } from "../entity/User";
import { LoginResponse } from "../model/login.model";
import { AppDataSource } from "./data-source";

interface LoginDatasourceInput {
  email: string;
  password: string;
}

export const loginDatasource = async (
  userData: LoginDatasourceInput
): Promise<LoginResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const existsUser = await userRepo.exist({
    where: {
      email: userData.email,
      password: userData.password,
    },
  });
  return { existsUser };
};
