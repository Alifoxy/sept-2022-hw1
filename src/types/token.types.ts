import { IUser } from "./user.types";

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

// export interface ITokenPayload {
//     id: string;
//     name: string;
// }

export type ITokenPayload = Pick<IUser, "_id" | "name">;