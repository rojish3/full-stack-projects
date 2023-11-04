import nodemailer from "nodemailer";
const jwt = require("jsonwebtoken");
import { IUser } from "../../types/users.types";
import {
  listUsers,
  createUser,
  loginUser,
  profileData,
  forgotPassword,
  passwordReset,
  removeUser,
  userDetails,
} from "../Repository";

import dotenv from "dotenv";
import { env } from "../../config";

export const Users = async () => {
  try {
    return await listUsers();
  } catch (error) {
    console.log(error);
  }
};

export const Create = async (user: IUser) => {
  try {
    return await createUser(user);
  } catch (error) {
    console.log(error);
  }
};

export const UserDetails = async (id: any) => {
  try {
    return await userDetails(id);
  } catch (error) {
    return error;
  }
};

export const Remove = async (id: any) => {
  try {
    return await removeUser(id);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (user: IUser) => {
  try {
    const userData = await loginUser(user);
    // console.log(userData);
    const token = jwt.sign(userData, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    // console.log(token);
    return {
      userData: userData,
      accesstoken: token,
      message: "Login Successful",
    };
    // return await loginUser(user);
  } catch (error) {
    throw error;
  }
};

export const ForgotPassword = async (email: string) => {
  try {
    const userEmail = await forgotPassword(email);
    // console.log(email);
    if (userEmail) {
      const mail = userEmail.email;
      const emailToken = jwt.sign(mail, process.env.SECRET_TOKEN);
      const resetLink = `http://localhost:5173/reset-password?token=${emailToken}`;
      // console.log(resetLink);
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: mail,
        subject: "Password Reset Request",
        html: `
        <p>Hello,</p>
        <p>You have requested to reset your password. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        `,
      };
      await transporter.sendMail(mailOptions);
      return "Password reset email sent successfully.";
    }
  } catch (error) {
    throw error;
  }
};
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

export const ResetPassword = async (token: any, password: string) => {
  try {
    return await passwordReset(token, password);
  } catch (error) {
    throw error;
  }
};

export const Profile = async () => {
  try {
    return await profileData();
  } catch (error) {
    console.log(error);
  }
};
