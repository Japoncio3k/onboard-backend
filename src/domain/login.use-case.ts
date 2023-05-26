import { addHours } from "date-fns";
import { GraphQLError } from "graphql";
import { sign } from "jsonwebtoken";
import { loginDatasource } from "../data/login.datasource";
import { searchUserDatasource } from "../data/search-user.datasource";
import { AppError } from "../model/error.model";

export interface LoginInput {
  userData: { email: string; password: string };
}

interface LoginSuccessResponse {
  loginData: {
    token: string;
  };
}

export const loginUseCase = async (
  args: LoginInput
): Promise<LoginSuccessResponse | AppError> => {
  const { existsUser } = await loginDatasource(args.userData);

  if (existsUser) {
    const user = await searchUserDatasource({ email: args.userData.email });
    return {
      loginData: {
        token: sign(
          {
            createdAt: new Date(),
            expiresAt: addHours(new Date(), 1),
            user,
          },
          "astiydno2mquhzk"
        ),
      },
    };
  } else {
    return {
      message: "Incorrect credentials",
    };
  }
};
