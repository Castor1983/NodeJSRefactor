import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async deleteById(id: string) {
    return await User.findByIdAndDelete(id);
  }
}
export const userRepository = new UserRepository();
