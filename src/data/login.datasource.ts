import { User } from '../entity/User';
import { AppDataSource } from './data-source';

interface LoginDatasourceInput {
  email: string;
  password: string;
}

interface LoginDatasourceResponse {
  userList: User[];
}

export const loginDatasource = async (userData: LoginDatasourceInput): Promise<LoginDatasourceResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const userList = await userRepo.findBy({ email: userData.email, password: userData.password });
  return { userList };
};
