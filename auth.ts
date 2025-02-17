import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
  providers: [
    Google({
      clientId:
        process.env.NODE_ENV === "production"
          ? process.env.AUTH_GOOGLE_ID_PROD
          : process.env.AUTH_GOOGLE_ID_DEV,
      clientSecret:
        process.env.NODE_ENV === "production"
          ? process.env.AUTH_GOOGLE_SECRET_PROD
          : process.env.AUTH_GOOGLE_SECRET_DEV,
    }),
  ],
  pages: {
    signIn: "/dashboard",
    signOut: "/",
    error: "/",
    verifyRequest: "/",
    newUser: "/dashboard",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 0,
  },
  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      }
      return false;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.surname = user.surname;
      session.user.username = user.username;
      session.user.email = user.email;
      session.user.emailVerified = user.emailVerified;
      session.user.image = user.image;
      session.user.createdAt = user.createdAt;
      session.user.updatedAt = user.updatedAt;

      return session;
    },
  },
  /*   debug: process.env.NODE_ENV === "development",
   */ useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
