import { DeleteResult } from "typeorm";
import { deleteUserDatasource } from "../data/delete-user.datasource";
import { AppError } from "../model/error.model";
import { CommonResponse } from "../model/response.model";
import { verifyToken } from "../utils/verify-token.util";

export interface DeleteUserInput {
  userData: {
    id: number;
  };
}

export const deleteUserUseCase = async (
  user: DeleteUserInput,
  authorization: string
): Promise<DeleteResult | AppError> => {
  const tokenResponse = verifyToken(authorization);
  if (tokenResponse.success) {
    return await deleteUserDatasource(user.userData);
  } else {
    return {
      message: tokenResponse.message,
    };
  }
};
