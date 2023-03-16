import { model, Schema } from "mongoose";

import { EGenders } from "../enums/gender.enum";

const userSchema = new Schema(
  {
      name: {
          type: String,
      },
      email: {
          type: String,
          unique: true,
          required: [true, "Email is required"],
          trim: true,
          lowercase: true,
      },
      password: {
          type: String,
          required: [true, "Password is required"],
      },
      gender: {
          type: String,
          enum: EGenders,
      },
      isActivated: {
          type: Boolean,
          default: false,
      },
  },
  {
      versionKey: false,
      timestamps: true,
  }
);

export const User = model("user", userSchema);
