"use server";

import { auth, signIn as signInAuth, signOut as signOutAuth } from "@/auth";

async function signIn() {
  const session = await auth();
  if (session) {
    return { error: "Already signed in" };
  }

  await signInAuth("google");

  return { success: "Signed in" };
}

async function signOut() {
  const session = await auth();
  if (!session) {
    return { error: "Not signed in" };
  }
  await signOutAuth();
  return { success: "Signed out" };
}

export { signIn, signOut };
