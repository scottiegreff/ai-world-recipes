import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";

/**
 * Configuration options for NextAuth.
 */
export const options: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      idToken: true,

      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("User name or password is not correct");

        // Naive Way of Comparing The Passwords
        // const isPassowrdCorrect = credentials?.password === user.password;
        if (!credentials?.password)
          throw new Error("Please Provide Your Password");
        if (typeof user.password !== "string")
          throw new Error("First Name is not a string");
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect)
          throw new Error("User name or password is not correct");
        // if (!user.emailVerified) throw new Error("Please verify your email first!");
        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    /**
     * Callback function to modify the JWT token.
     * @param token - The JWT token.
     * @param user - The user object.
     * @returns The modified token.
     */
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    /**
     * Callback function to modify the session object.
     * @param token - The JWT token.
     * @param session - The session object.
     * @returns The modified session object.
     */
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};
