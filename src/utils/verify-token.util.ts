import { isAfter, parseISO } from "date-fns";
import { GraphQLError } from "graphql";
import { verify } from "jsonwebtoken";
import { Roles } from "../model/roles.model";
import { TokenModel } from "../model/token.model";

interface VerifyTokenResponseSuccess {
  success: true;
}

interface VerifyTokenResponseError {
  success: false;
  message: string;
}

export const verifyToken = (
  token: string
): VerifyTokenResponseSuccess | VerifyTokenResponseError => {
  if (!token) {
    return {
      message: "You have to be authenticated to perform this action",
      success: false,
    };
  }

  let decoded;
  try {
    decoded = verify(token, "astiydno2mquhzk");
  } catch (error) {
    return { message: "Invalid Token", success: false };
  }

  if (isAfter(new Date(), parseISO((<TokenModel>decoded).expiresAt))) {
    return { message: "Authorization token expired", success: false };
  } else if ((<TokenModel>decoded).user.userData.role === Roles.Admin) {
    return {
      success: true,
    };
  } else {
    return { message: "Unauthorized", success: false };
  }
};
