// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
    } & DefaultSession["user"];
  }
}
