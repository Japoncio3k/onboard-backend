import { deleteUserDatasource } from '../data/delete-user.datasource';

interface DeleteUserInput {
  id: number;
}

export const deleteUserUseCase = async (_: unknown, args: { userData: DeleteUserInput }) => {
  await deleteUserDatasource(args.userData);
  return {
    message: 'User deleted successfully',
  };
};
