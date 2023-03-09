import { createUserDatasource } from '../data/create-user.datasource';

interface UserOutput {
  name: string;
  email: string;
  id: number;
  birthdate: string;
}

interface UserInput {
  name: string;
  email: string;
  password: string;
  birthdate: string;
}

interface CreateUserInput {
  userData: UserInput;
}

export const createUserUseCase = async (_: unknown, args: CreateUserInput): Promise<UserOutput> => {
  return await createUserDatasource(args.userData);
};
