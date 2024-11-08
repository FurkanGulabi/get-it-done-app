"use client";
import React from "react";
import Todo from "./Todo";
import { useQuery } from "@tanstack/react-query";
import { GetTodos } from "@/actions/Todo/GetTodos";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import NoTodosError from "./NoTodosError";
import TodoServerError from "./TodoServerError";

const TodoContainer = () => {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: { opacity: 0, y: 20 },
  };

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
    return <TodoServerError />;
  }

  if (!Array.isArray(todos) || todos.length === 0) {
    return <NoTodosError />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="w-full flex flex-col items-center gap-2"
        variants={container}
        animate="visible"
        initial="hidden"
      >
        {todos.map((todo) => (
          <motion.span className="w-full" key={todo.id} variants={item}>
            <Todo todo={todo} />
          </motion.span>
        ))}
      </motion.main>
    </AnimatePresence>
  );
};

export default TodoContainer;
