import * as jwt from "jsonwebtoken";

import { tokenConstants } from "../validators/constants/token.constants";
import { ITokenPair, ITokenPayload } from "../types/token.types";
import {ApiError} from "../errors/api.error";

class TokenService {
    public generateTokenPair(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, tokenConstants.ACCESS_SECRET, {
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
    public checkToken(token: string, tokenType=""){
        try{
            switch(tokenType){

            }
        }catch (e) {
            throw new ApiError("Token not valid",401);
        }
    }
}

export const tokenService = new TokenService();