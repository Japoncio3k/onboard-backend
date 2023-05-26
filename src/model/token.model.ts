import { Roles } from "./roles.model";
import { UserModel } from "./user.model";

export interface TokenModel {
  createdAt: Date;
  expiresAt: string;
  user: UserModel;
}
