import { isAfter } from "date-fns";
import { GraphQLError } from "graphql";
import { verify } from "jsonwebtoken";
import { Roles } from "../model/roles.model";
import { TokenModel } from "../model/token.model";

export const verifyToken = <Response>(
  token: string,
  success: () => Promise<Response>
): Promise<Response> => {
  if (!token) {
    throw new GraphQLError(
      "You have to be authenticated to perform this action"
    );
  }

  let decoded;
  try {
    decoded = verify(token, "astiydno2mquhzk");
  } catch (error) {
    throw new GraphQLError("Invalid Token");
  }

  if (isAfter(new Date(), (<TokenModel>decoded).expiresAt)) {
    throw new GraphQLError("Authorization token expired");
  } else if ((<TokenModel>decoded).userRole === Roles.Admin) {
    return success();
  } else {
    throw new GraphQLError("Unauthorized");
  }
};
