import { auth } from "@/auth";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider = async ({ children }: SessionProviderProps) => {
  const session = await auth();

  const filteredSession = {
    user: {
      name: session?.user.name,
      email: session?.user.email,
      image: session?.user.image,
      username: session?.user.username,
    },
    expires: session?.expires ?? "",
  };
  return (
    <NextAuthSessionProvider session={filteredSession}>
      {children}
    </NextAuthSessionProvider>
  );
};
