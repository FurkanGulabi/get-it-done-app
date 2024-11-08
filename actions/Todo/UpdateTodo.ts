"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { EditTodoSchema } from "@/schemas/EditTodoSchema";
import { z } from "zod";

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
async function updateEditTodo(
  todo: z.infer<typeof EditTodoSchema>,
  todoId: string
) {
  const session = await auth();
  if (!session) {
    return { error: "Unauthorized" };
  }
  const validatedFields = EditTodoSchema.safeParse(todo);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      status: todo.status,
      endDate: todo.endDate,
    },
  });
  if (!updatedTodo) {
    return { error: "Todo not found" };
  }

  return { success: true };
}

export { updateCompletedStatus, updateEditTodo };
