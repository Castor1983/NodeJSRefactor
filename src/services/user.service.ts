import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }

  public async findById(id: string): Promise<IUser> {
    const user = await userRepository.findById(id);
    return user;
  }

  public async deleteById(id: string): Promise<IUser> {
    const user = await userRepository.deleteById(id);
    return user;
  }
}

export const userService = new UserService();
