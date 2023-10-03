import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.res.locals;
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await userService.deleteById(id);
      res.status(204);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
