import bcrypt from "bcrypt";

import { configs } from "../configs/config";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, +configs.SECRET_SALT);
  }
  public async compare(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }
}

export const passwordService = new PasswordService();
