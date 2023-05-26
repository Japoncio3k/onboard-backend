import { UpdateResult } from "typeorm";
import { updateUserDatasource } from "../data/update-user.datasource";
import { AppError } from "../model/error.model";
import { CommonResponse } from "../model/response.model";
import { verifyToken } from "../utils/verify-token.util";

export interface UpdateUserInput {
  userData: {
    id: number;
    userData: {
      email?: string;
      password?: string;
      birthdate?: string;
      name?: string;
    };
  };
}

export const updateUserUseCase = async (
  args: UpdateUserInput,
  authorization: string
): Promise<UpdateResult | AppError> => {
  const tokenResponse = verifyToken(authorization);
  if (tokenResponse.success) {
    return await updateUserDatasource(args.userData);
  } else {
    return { message: tokenResponse.message };
  }
};
