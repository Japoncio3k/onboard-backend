import { UpdateResult } from "typeorm";
import { createUserDatasource } from "../data/create-user.datasource";
import { searchUserDatasource } from "../data/search-user.datasource";
import { updateUserDatasource } from "../data/update-user.datasource";
import { UserOutput } from "../model/user-output.model";
import { verifyToken } from "../utils/authentication.util";

export enum UpsertUserActions {
  Create = "Create",
  Update = "Update",
}

export interface UpsertUserInput {
  userData: {
    id: number;
    email: string;
    password: string;
    birthdate: string;
    name: string;
  };
}

interface UpsertUserResult {
  data: UpdateResult | UserOutput;
  action: UpsertUserActions;
}

export const upsertUserUseCase = async (
  _: unknown,
  args: UpsertUserInput,
  headers: { authorization: string }
): Promise<UpsertUserResult> => {
  return verifyToken(headers.authorization, async () => {
    const users = await searchUserDatasource({ id: args.userData.id });
    if (users.length === 0) {
      const user = await createUserDatasource(args.userData);
      return {
        data: { user },
        action: UpsertUserActions.Create,
      };
    } else {
      return {
        data: await updateUserDatasource(args.userData),
        action: UpsertUserActions.Update,
      };
    }
  });
};
