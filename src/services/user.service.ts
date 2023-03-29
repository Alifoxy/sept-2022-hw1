import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { IUser } from "../types/user.types";
import { s3Service } from "./s3.service";
import { UploadedFile } from "express-fileupload";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "user", user._id);

      if (user.avatar) {
        await s3Service.deletePhoto(user.avatar);
      }

      return await User.findByIdAndUpdate(
          user._id,
          { avatar: filePath },
          { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.avatar) {
        throw new ApiError("User doesnt have avatar", 422);
      }

      await s3Service.deletePhoto(user.avatar);

      return await User.findByIdAndUpdate(
          user._id,
          { $unset: { avatar: true } },
          { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }


}

export const userService = new UserService();
