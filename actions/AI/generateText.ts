"use server";
import { auth } from "@/auth";
import { AddTodoSchema } from "@/schemas/AddTodoSchema";
import { z } from "zod";

async function generateDescriptionFromTitle(
  title: Pick<z.infer<typeof AddTodoSchema>, "title">
) {
  const session = await auth();
  if (!session) return { error: "Unothorized" };
}

export { generateDescriptionFromTitle };
