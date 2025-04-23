//token will take two things userObject jo ban ke aaya hai and resobject
// so that it can generate and send the token to cookies also

import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res: Response, user: IUserDocument) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
    partitioned: true, // Add this line
  });

  return token;
};
