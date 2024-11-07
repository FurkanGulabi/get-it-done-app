"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

async function updateCompletedStatus(todoId: string, isCompleted: boolean) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  if (!todoId || isCompleted === undefined) {
    return { error: "Todo id and isCompleted status is required" };
  }
  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      isCompleted,
    },
  });

  if (!updatedTodo) {
    return { error: "Todo not found" };
  }

  return { success: true };
}

export { updateCompletedStatus };
