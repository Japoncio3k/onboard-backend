import { User } from "../entity/User";
import { AppDataSource } from "./data-source";

interface UpdateUserDatasourceInput {
  id: number;
  userData: {
    email?: string;
    password?: string;
    birthdate?: string;
    name?: string;
  };
}

export const updateUserDatasource = async (user: UpdateUserDatasourceInput) => {
  const userRepo = AppDataSource.getRepository(User);
  return await userRepo.update({ id: user.id }, { ...user.userData });
};
