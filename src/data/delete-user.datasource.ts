import { DeleteResult } from 'typeorm';
import { User } from '../entity/User';
import { AppDataSource } from './data-source';

interface DeleteUserDatasourceInput {
  id: number;
}

export const deleteUserDatasource = async (userData: DeleteUserDatasourceInput): Promise<DeleteResult> => {
  const userRepo = AppDataSource.getRepository(User);
  return await userRepo.delete({ id: userData.id });
};
