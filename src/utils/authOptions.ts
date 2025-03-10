import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
              authenticationType: "credentials",
            }),
          }
        );
        // console.log(result);
        if (!result.ok) {
          return null;
        }
        const res = await result.json();
        return res.user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return true; // Always allow login
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/all-resumes";
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          _id: token.user._id,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...user,
          _id: user._id,
        };
      }
      return token;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
