import { User } from "../entity/User";
import { UserModel } from "../model/user.model";

export const mapUserList = (userList: User[]): UserModel[] => {
  return userList.map((user) => ({
    birthdate: user.birthdate,
    email: user.email,
    id: user.id,
    name: user.name,
    role: user.role,
  }));
};
