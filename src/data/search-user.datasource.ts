import { User } from "../entity/User";
import { AppDataSource } from "./data-source";

interface SearchUserDatasourceInput {
  id: number;
}

export const searchUserDatasource = async (
  userData: SearchUserDatasourceInput
) => {
  const userRepo = AppDataSource.getRepository(User);
  return await userRepo.findBy({ id: userData.id });
};
