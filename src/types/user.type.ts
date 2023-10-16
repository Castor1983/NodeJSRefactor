import { Document } from "mongoose";

import { EGenders } from "../enums/gender.enum";
import { EUserStatus } from "../enums/user-status.enum";

export interface IUser extends Document {
  name?: string;
  age?: number;
  gender?: EGenders;
  email: string;
  password: string;
  status: EUserStatus;
}
export type IUserCredentials = Pick<IUser, "email" | "password">;
