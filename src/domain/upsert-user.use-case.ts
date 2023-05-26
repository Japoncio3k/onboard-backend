import { GraphQLError } from "graphql";
import { UpdateResult } from "typeorm";
import { createUserDatasource } from "../data/create-user.datasource";
import { searchUserDatasource } from "../data/search-user.datasource";
import { updateUserDatasource } from "../data/update-user.datasource";
import { AppError } from "../model/error.model";
import { UserModel } from "../model/user.model";
import { verifyToken } from "../utils/verify-token.util";

export enum UpsertUserActions {
  Create = "Create",
  Update = "Update",
}

export interface UpsertUserInput {
  userData: {
    id: number;
    userData: {
      email: string;
      password: string;
      birthdate: string;
      name: string;
    };
  };
}

interface UpsertUserResult {
  data: UpdateResult | UserModel;
  action: UpsertUserActions;
}

export const upsertUserUseCase = async (
  userInput: UpsertUserInput,
  authorization: string
): Promise<UpsertUserResult | AppError> => {
  const tokenResponse = verifyToken(authorization);
  if (tokenResponse.success) {
    const user = await searchUserDatasource({ id: userInput.userData.id });
    if (!user) {
      const createdUser = await createUserDatasource(
        userInput.userData.userData
      );
      return {
        data: createdUser,
        action: UpsertUserActions.Create,
      };
    } else {
      const updatedUser = (await searchUserDatasource({
        id: userInput.userData.id,
      })) as UserModel;
      return {
        data: updatedUser,
        action: UpsertUserActions.Update,
      };
    }
  } else {
    return {
      message: tokenResponse.message,
    };
  }
};
