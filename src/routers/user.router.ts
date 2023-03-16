import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators";

const router = Router();

router.get("/", userController.getAll);
router.post("/", commonMiddleware.isBodyValid(UserValidator.createUser), userController.create);

router.get(
  "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userMiddleware.getByIdOrThrow,
    userController.getById

);
router.put(
    "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(UserValidator.updateUser),
    userMiddleware.getByIdOrThrow,
    userController.update
);
router.delete(
    "/:userId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("userId"),
    userMiddleware.getByIdOrThrow,
    userController.delete
);

export const userRouter = router;
