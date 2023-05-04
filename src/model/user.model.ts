import { Roles } from "./roles.model";

export interface UserModel {
  name: string;
  email: string;
  id: number;
  birthdate: string;
  role: Roles;
}
