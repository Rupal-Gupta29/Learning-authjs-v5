import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./database/dbConnect";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        const email = credentials.email;
        const password = credentials.password;

        await dbConnect();

        const findUser = await User.findOne({ email });

        if (!findUser) {
          return {
            success: false,
            errors: {
              email: "User does not exist. Please register yourself first.",
            },
          };
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          findUser.password
        );

        if (!isPasswordValid) {
          return {
            success: false,
            errors: {
              password: "Incorrect password! Please check your credentials.",
            },
          };
        }

        return {
          name: findUser.name,
          email: findUser.email,
        };
      },
    }),
  ],
});
