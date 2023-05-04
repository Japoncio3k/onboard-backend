import { UpdateResult } from "typeorm";
import { updateUserDatasource } from "../data/update-user.datasource";
import { CommonResponse } from "../model/response.model";
import { verifyToken } from "../utils/authentication.util";

export interface UpdateUserInput {
  userData: {
    id: number;
    email?: string;
    password?: string;
    birthdate?: string;
    name?: string;
  };
}

export const updateUserUseCase = async (
  _: unknown,
  args: UpdateUserInput,
  headers: { authorization: string }
): Promise<UpdateResult> => {
  return verifyToken(headers.authorization, async () => {
    return await updateUserDatasource(args.userData);
  });
};
