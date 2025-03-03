import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as NextAuthConfig["adapter"],
  providers: [
    Google({
      clientId: process.env.NODE_ENV === "production"
        ? process.env.AUTH_GOOGLE_ID_PROD
        : process.env.AUTH_GOOGLE_ID_DEV,
      clientSecret: process.env.NODE_ENV === "production"
        ? process.env.AUTH_GOOGLE_SECRET_PROD
        : process.env.AUTH_GOOGLE_SECRET_DEV,
      authorization: {
        params: {
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
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
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google") {
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
  debug: process.env.NODE_ENV !== "production",
  useSecureCookies: process.env.NODE_ENV === "production",
  secret: process.env.AUTH_SECRET,
  trustHost: true,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);