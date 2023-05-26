import { User } from "../entity/User";
import { UserModel } from "../model/user.model";

export const mapUser = (user: User): UserModel => {
  return {
    id: user.id,
    userData: {
      birthdate: user.birthdate,
      email: user.birthdate,
      name: user.name,
      role: user.role,
    },
  };
};
