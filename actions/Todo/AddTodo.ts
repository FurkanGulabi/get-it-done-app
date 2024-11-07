"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";
import { AddTodoSchema } from "@/schemas/AddTodoSchema";
import { z } from "zod";

async function AddTodo(values: z.infer<typeof AddTodoSchema>) {
  const session = await auth();
  if (!session) {
    return { error: "Unothorized" };
  }

  const validateField = AddTodoSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid Fields" };
  }

  const newTodo = await prisma.todo.create({
    data: {
      title: values.title,
      description: values.description,
      endDate: values.endDate,
      priority: values.priority,
      status: values.status,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return { data: newTodo };
}

export { AddTodo };
