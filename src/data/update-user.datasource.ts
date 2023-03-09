import { User } from '../entity/User';
import { AppDataSource } from './data-source';

interface UpdateUserDatasourceInput {
  id: number;
  email?: string;
  password?: string;
  birthdate?: string;
  name?: string;
}

export const updateUserDatasource = async (userData: UpdateUserDatasourceInput) => {
  const userRepo = AppDataSource.getRepository(User);
  await userRepo.update({ id: userData.id }, userData);
};
