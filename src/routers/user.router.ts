import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";

import { userController } from "../controllers/user.controller";
import { ApiError } from "../errors/api.error";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

const router = Router();
router.get("", userController.getAll);
router.get(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.findById,
);
router.delete(
  ":id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.deleteById,
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
