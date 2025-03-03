"use client";
import { GetTodos } from "@/actions/Todo/GetTodos";
import { TodoType } from "@/types/TodoType";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import AddTodoButton from "./AddTodoButton";
import NoTodosError from "./NoTodosError";
import SortTodos, { SortOption } from "./SortTodos";
import Todo from "./Todo";
import TodoServerError from "./TodoServerError";

const TodoContainer = () => {
  const [sortOption, setSortOption] = useState<SortOption>("priority");
  const [isAscending, setIsAscending] = useState(true);

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

  const sortTodos = (todos: TodoType["todo"][]) => {
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    const statusOrder = { ONGOING: 4, PENDING: 3, POSTPONED: 2, COMPLETED: 1 };

    return [...todos].sort((a, b) => {
      // First, compare completed status
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      // Then apply the selected sort
      let comparison = 0;
      switch (sortOption) {
        case "priority":
          comparison =
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
          break;
        case "date":
          comparison =
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
        case "status":
          comparison =
            (statusOrder[b.status] || 0) - (statusOrder[a.status] || 0);
          break;
        default:
          comparison = 0;
      }

      // Apply sort direction
      return isAscending ? comparison : -comparison;
    });
  };

  if (isLoading) {
    return (
      <main className="w-full space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-10 w-10 bg-muted animate-pulse rounded-md" />
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-muted animate-pulse rounded-md" />
            <div className="w-[200px] h-10 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-card border-border rounded-lg p-4 space-y-4 border"
            >
              <div className="flex gap-3">
                <div className="h-5 w-5 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-24"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return <TodoServerError />;
  }

  if (!Array.isArray(todos) || todos.length === 0) {
    return (
      <motion.main
        className="w-full space-y-4"
        variants={container}
        animate="visible"
        initial="hidden"
      >
        <div className="flex items-center justify-between">
          <AddTodoButton />
        </div>
        <NoTodosError />
      </motion.main>
    );
  }

  const sortedTodos = sortTodos(todos);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        className="w-full space-y-4"
        variants={container}
        animate="visible"
        initial="hidden"
      >
        <div className="flex items-center justify-between">
          <AddTodoButton />
          <SortTodos
            currentSort={sortOption}
            onSort={setSortOption}
            isAscending={isAscending}
            onDirectionChange={() => setIsAscending(!isAscending)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedTodos.map((todo) => (
            <motion.div key={todo.id} variants={item} layout>
              <Todo todo={todo} />
            </motion.div>
          ))}
        </div>
      </motion.main>
    </AnimatePresence>
  );
};

export default TodoContainer;
