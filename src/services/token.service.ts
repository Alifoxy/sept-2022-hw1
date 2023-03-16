import * as jwt from "jsonwebtoken";

import { tokenConstants } from "../validators/constants/token.constants";
import { configs } from "../configs/config";
import { ITokenPair, ITokenPayload } from "../types/token.types";
import { ETokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";

class TokenService {
    public generateTokenPair(payload: { name: string; _id: string | undefined }): ITokenPair {
        const accessToken = jwt.sign(payload, tokenConstants.ACCESS_SECRET,
            {
                expiresIn: "15m",
            });
        const refreshToken = jwt.sign(payload, tokenConstants.REFRESH_SECRET, {
            expiresIn: "30d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public checkToken(token: string, tokenType = ETokenType.access):ITokenPayload{
        try{
            let secret = "";

            switch (tokenType) {
                case ETokenType.access:
                    secret = configs.ACCESS_SECRET;
                    break;
                case ETokenType.refresh:
                    secret = configs.REFRESH_SECRET;
                    break;
            }

            return jwt.verify(token, secret) as ITokenPayload;
        }catch (e) {
            throw new ApiError("Token not valid",401);
        }
    }
}

export const tokenService = new TokenService();