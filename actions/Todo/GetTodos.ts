"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

async function GetTodos() {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (!todos || todos.length === 0) {
      return { error: "No todos found" };
    }

    return todos;
  } catch (error) {
    console.error("Error fetching todos", error);
    return { error: "Failed to fetch todos" };
  }
}

export { GetTodos };
