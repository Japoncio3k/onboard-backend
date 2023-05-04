import { addHours } from "date-fns";
import { GraphQLError } from "graphql";
import { sign } from "jsonwebtoken";
import { loginDatasource } from "../data/login.datasource";
import { CommonResponse } from "../model/response.model";

export interface LoginInput {
  userData: { email: string; password: string };
}

interface UserData {
  id: number;
  name: string;
  email: string;
  birthdate: string;
}

interface LoginSuccessResponse {
  loginData: {
    token: string;
    user: UserData;
  };
}

export const loginUseCase = async (
  _: unknown,
  args: LoginInput
): Promise<LoginSuccessResponse> => {
  const { userList } = await loginDatasource(args.userData);

  if (userList.length > 0) {
    return {
      loginData: {
        token: sign(
          {
            createdAt: new Date(),
            expiresAt: addHours(new Date(), 1),
            userRole: userList[0].role,
          },
          "astiydno2mquhzk"
        ),
        user: {
          ...userList[0],
        },
      },
    };
  } else {
    throw new GraphQLError("Incorrect credentials");
  }
};
