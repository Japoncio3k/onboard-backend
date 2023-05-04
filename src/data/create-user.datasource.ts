import { GraphQLError } from "graphql";
import { User } from "../entity/User";
import { Roles } from "../model/roles.model";
import { UserModel } from "../model/user.model";
import { AppDataSource } from "./data-source";

interface CreateUserDatasourceInput {
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

export const createUserDatasource = async (
  userData: CreateUserDatasourceInput
): Promise<UserModel> => {
  const user = new User();
  user.name = userData.name;
  user.birthdate = userData.birthdate;
  user.email = userData.email;
  user.password = userData.password;
  user.role = Roles.Common;
  await AppDataSource.manager.save(user);
  return {
    name: user.name,
    birthdate: user.birthdate,
    email: user.email,
    id: user.id,
    role: Roles.Common,
  };
};
