import { User } from "../entity/User";
import { AppDataSource } from "./data-source";
import { mapUser } from "./user.mapper";

interface SearchUserDatasourceInput {
  id?: number;
  email?: string;
}

export const searchUserDatasource = async (
  userData: SearchUserDatasourceInput
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({
    id: userData.id,
    email: userData.email,
  });
  if (user) {
    return mapUser(user);
  }
  return null;
};
