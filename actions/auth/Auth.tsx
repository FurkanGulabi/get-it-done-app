"use server";

import { auth, signIn as signInAuth, signOut as signOutAuth } from "@/auth";
import prisma from "@/lib/db";

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

export async function deleteMyAccount() {
  // Get the authenticated session
  const session = await auth();

  // Check if user is authenticated
  if (!session?.user?.id) {
    return { error: "Unauthorized", status: 401 };
  }

  const userId = session.user.id;

  try {
    // Use a transaction to ensure atomicity
    await prisma.$transaction([
      prisma.todo.deleteMany({ where: { userId } }),
      prisma.session.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } }),
    ]);

    return {
      success: true,
      message: "Account and all related data deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Failed to delete account:", error);
    // Provide more specific error feedback if possible
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { error: `Failed to delete account: ${errorMessage}`, status: 500 };
  }
}

export { signIn, signOut };

