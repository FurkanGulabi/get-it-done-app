"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

async function deleteTodo(todoId: string) {
  console.log("invoked deleteTodo");

  const session = await auth();
  if (!session) {
    return { error: "Unothorized" };
  }

  if (!todoId) {
    return { error: "Todo id is required" };
  }
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: todoId,
      userId: session.user.id,
    },
  });

  if (!deletedTodo) {
    return { error: "Todo not found" };
  }
  console.log("Todo deleted");

  return { success: true };
}

export { deleteTodo };
