import { User } from "../models/User.model";
import { userRepository } from "../repjsitories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }
}

export const userService = new UserService();
