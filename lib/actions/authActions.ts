"use server";

import { User } from "@prisma/client";

import * as bcrypt from "bcrypt";
import {
  compileActivationTemplate,
  compileResetPassTemplate,
  sendMail,
} from "../mail";
import { signJwt, verifyJwt } from "../jwt";
import { prisma } from "@/lib/prisma";

/**
 * Function to register a user.
 * @param user
 * @returns
 */
export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image" | "name">
) {
  const hashedPassword = await bcrypt.hash(user.password || "", 10);
  const result = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });

  const jwtUserId = signJwt({
    id: result.id,
  });
  // if(typeof(user.firstName) !== "string") throw new Error("First Name is not a string");
  // const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  // const body = compileActivationTemplate(user.firstName, activationUrl);
  // await sendMail({ to: user.email, subject: "Activate Your Account", body });
  return result;
}

type ActivateUserFunc = (
  jwtUserId: string
) => Promise<"userNotExist" | "alreadyActivated" | "success">;

/**
 * Function to activate a user.
 * @param jwtUserId
 * @returns
 */
export const activateUser: ActivateUserFunc = async (jwtUserID) => {
  const payload = verifyJwt(jwtUserID);
  if (!payload) {
    // handle the case where payload is null or undefined
    return "userNotExist";
  }
  const userId = payload.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return "userNotExist";
  if (user.emailVerified) return "alreadyActivated";
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  return "success";
};

/**
 * Function to send a password reset email.
 * @param email
 * @returns
 */
export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) throw new Error("The User Does Not Exist!");

  //  Send Email with Password Reset Link
  const jwtUserId = signJwt({
    id: user.id,
  });
  const resetPassUrl = `${process.env.NEXTAUTH_URL}/auth/resetPass/${jwtUserId}`;
  if (typeof user.firstName !== "string")
    throw new Error("First Name is not a string");
  const body = compileResetPassTemplate(user.firstName, resetPassUrl);
  const sendResult = await sendMail({
    to: user.email,
    subject: "Reset Password",
    body: body,
  });
  return sendResult;
}

type ResetPasswordFucn = (
  jwtUserId: string,
  password: string
) => Promise<"userNotExist" | "success">;

/**
 * Function to reset a password.
 * @param jwtUserId
 * @param password
 * @returns
 */
export const resetPassword: ResetPasswordFucn = async (jwtUserId, password) => {
  const payload = verifyJwt(jwtUserId);
  if (!payload) return "userNotExist";
  const userId = payload.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return "userNotExist";

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: await bcrypt.hash(password, 10),
    },
  });
  if (result) return "success";
  else throw new Error("Something went wrong!");
};
