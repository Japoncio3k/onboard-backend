import { updateUserDatasource } from '../data/update-user.datasource';

interface UpdateUserInput {
  id: number;
  email?: string;
  password?: string;
  birthdate?: string;
  name?: string;
}

export const updateUserUseCase = async (_: unknown, args: { userData: UpdateUserInput }) => {
  await updateUserDatasource(args.userData);
  return {
    message: 'User updated successfully',
  };
};
