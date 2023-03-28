import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { userMiddleware } from "../middlewares/user.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {authMiddleware} from "../middlewares/auth.middleware";
import { EActionTokenType } from "../enums/action-token-type.enum";
import {UserValidator} from "../validators";


const router = Router();

router.post(
    "/create",
    commonMiddleware.isBodyValid(UserValidator.createUser),
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.register
);

router.post(
    "/login",
    commonMiddleware.isBodyValid(UserValidator.loginUser),
    userMiddleware.getDynamicallyOrThrow("email"),
    authController.login
);
router.post(
    "/password/change",
    commonMiddleware.isBodyValid(UserValidator.changeUserPassword),
    authMiddleware.checkAccessToken,
    authController.changePassword
);

router.post(
    "/password/forgot",
    userMiddleware.getDynamicallyOrThrow("email"),
    authController.forgotPassword
);

router.put(
    `/password/forgot/:token`,
    authMiddleware.checkActionForgotToken,
    authController.setForgotPassword
);

router.post(
    "/activate",
    commonMiddleware.isBodyValid(UserValidator.emailValidator),
    userMiddleware.getDynamicallyOrThrow("email"),
    authController.sendActivateToken
);

router.put(`/activate/:token`,
    authMiddleware.checkActionToken(EActionTokenType.activate),
    authController.activate);

router.post(
    "/refresh",
    authMiddleware.checkRefreshToken,
    authController.refresh
);

export const authRouter = router;