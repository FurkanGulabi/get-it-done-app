"use client";
import React from "react";
import Todo from "./Todo";
import { useQuery } from "@tanstack/react-query";
import { GetTodos } from "@/actions/Todo/GetTodos";
import { Skeleton } from "@/components/ui/skeleton";

const TodoContainer = () => {
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await GetTodos(),
  });
  const { data: todos, isLoading, isError } = todoQuery;

  if (isLoading) {
    return (
      <main className="w-full flex flex-col gap-2">
        <Skeleton className="w-full border p-[4.5rem]" />
        <Skeleton className="w-full border p-[4.5rem]" />
        <Skeleton className="w-full border p-[4.5rem]" />
        <Skeleton className="w-full border p-[4.5rem]" />
        <Skeleton className="w-full border p-[4.5rem]" />
        <Skeleton className="w-full border p-[4.5rem]" />
        <Skeleton className="w-full border p-[4.5rem]" />
      </main>
    );
  }
  if (isError) {
    return (
      <main className="w-full flex flex-col items-center gap-2">
        <h1 className="text-red-500">An error occurred: {"Unknown error"}</h1>
      </main>
    );
  }

  if (!Array.isArray(todos) || todos.length === 0) {
    return (
      <main className="w-full flex flex-col items-center gap-2">
        <h1 className="text-red-500">No todos found</h1>
      </main>
    );
  }

  return (
    <main className="w-full flex flex-col items-center gap-2 ">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </main>
  );
};

export default TodoContainer;
