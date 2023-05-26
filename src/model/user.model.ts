import { Roles } from "./roles.model";

export interface UserModel {
  userData: {
    birthdate: string;
    name: string;
    email: string;
    role: Roles;
  };
  id: number;
}
