import { Roles } from "./roles.model";

export interface TokenModel {
  createdAt: Date;
  expiresAt: Date;
  userRole: Roles;
}
