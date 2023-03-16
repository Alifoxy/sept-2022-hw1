import { NextFunction, Request, Response } from "express";

import { ETokenType } from "../enums/token-type.enum";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ApiError } from "../errors/api.error";
import { Token } from "../models/Token.model";
import { Action} from "../models/Action.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const accessToken = req.get("Authorization");

            if (!accessToken) {
                throw new ApiError("No token", 401);
            }

            const jwtPayload = tokenService.checkToken(accessToken);

            const tokenInfo = await Token.findOne({ accessToken });

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401);
            }

            req.res.locals = { tokenInfo, jwtPayload };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const refreshToken = req.get("Authorization");

            if (!refreshToken) {
                throw new ApiError("No token", 401);
            }

            const jwtPayload = tokenService.checkToken(
                refreshToken,
                ETokenType.refresh
            );

            const tokenInfo = await Token.findOne({ refreshToken });

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401);
            }

            req.res.locals = { tokenInfo, jwtPayload };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionForgotToken(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const actionToken = req.params.token;

            if (!actionToken) {
                throw new ApiError("No token", 401);
            }

            const jwtPayload = tokenService.checkActionToken(
                actionToken,
                EActionTokenType.forgot
            );

            const tokenInfo = await Action.findOne({ actionToken });

            if (!tokenInfo) {
                throw new ApiError("Token not valid", 401);
            }

            req.res.locals = { tokenInfo, jwtPayload };
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();