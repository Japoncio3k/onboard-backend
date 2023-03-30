import { User } from '../entity/User';
import { AppDataSource } from './data-source';

interface CreateUserDatasourceInput {
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

interface CreateUserDatasourceResult {
  name: string;
  email: string;
  id: number;
  birthdate: string;
  role: number;
}

export const createUserDatasource = async (
  userData: CreateUserDatasourceInput,
): Promise<CreateUserDatasourceResult> => {
  const user = new User();
  user.name = userData.name;
  user.birthdate = userData.birthdate;
  user.email = userData.email;
  user.password = userData.password;
  user.role = 0;
  await AppDataSource.manager.save(user);
  return {
    name: user.name,
    birthdate: user.birthdate,
    email: user.email,
    id: user.id,
    role: 0,
  };
};
