import { User } from "../entity/User";
import { LoginResponse } from "../model/login.model";
import { AppDataSource } from "./data-source";
import { mapUserList } from "./user-list.mapper";

interface LoginDatasourceInput {
  email: string;
  password: string;
}

export const loginDatasource = async (
  userData: LoginDatasourceInput
): Promise<LoginResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const userList = await userRepo.findBy({
    email: userData.email,
    password: userData.password,
  });

  return { userList: mapUserList(userList) };
};
