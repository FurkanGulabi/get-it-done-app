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

async function deleteAllTodos() {
  const session = await auth();
  if (!session) {
    return { error: "Unothorized" };
  }

  const t = await prisma.todo.deleteMany({
    where: {
      userId: session.user.id,
    },
  });
  console.log(t);

  if (t.count === 0) {
    return { success: true };
  }

  return { error: "Error deleting todo" };
}

export { deleteAllTodos, deleteTodo };
