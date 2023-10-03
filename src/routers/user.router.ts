import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.get(
  "",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  },
);
router.get(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError("Not valid ID", 400);
    }
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.delete(
  ":id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      res.status(204);
    } catch (e) {
      next(e);
    }
  },
);

router.post("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = UserValidator.create.validate(req.body);
    if (error) {
      throw new ApiError(error.message, 400);
    }
    const createUser = await User.create(value);
    res.status(201).json(createUser);
  } catch (e) {
    next(e);
  }
});

router.put(":id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new ApiError("Not valid ID", 400);
    }
    const { error, value } = UserValidator.update.validate(req.body);
    if (error) {
      throw new ApiError(error.message, 400);
    }
    const user = await User.findByIdAndUpdate(id, value, {
      returnDocument: "after",
    });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});
export const userRouter = router;
