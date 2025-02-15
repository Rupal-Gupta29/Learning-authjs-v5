import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentiaals", credentials);
        if (credentials === null) return null;
        try {
          const findUser = await User.findOne({ email: credentials?.email });
          if (!findUser) {
            throw new Error("User not found! Please register yourself first.");
          }

          const isPasswordValid = bcrypt.compare(
            credentials?.password,
            findUser.password
          );
          if (!isPasswordValid) {
            throw new Error(
              "Invalid Password! Please try with the correct password."
            );
          }

          return findUser;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
});
