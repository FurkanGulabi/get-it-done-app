"use client";

import { CalculateRemainingTime } from "@/lib/CalculateRemainingTime";
import { TodoType } from "@/types/TodoType";
import React from "react";
import DeleteTodoButton from "./DeleteTodoButton";
import EditTodoButton from "./EditTodoButton";
import TodoCheckbox from "./TodoCheckbox";

const Todo = ({ todo }: TodoType) => {
  const { priority, status, title, description, isCompleted, endDate, id } =
    todo;

  const statusColor = {
    PENDING: "text-gray-600",
    ONGOING: "text-blue-600",
    POSTPONED: "text-orange-600",
    COMPLETED: "text-green-600",
  }[status];

  const priorityColor = {
    LOW: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HIGH: "bg-red-500",
  }[priority];

  return (
    <div className="h-full bg-card border-border backdrop-blur-sm border p-4 rounded-lg flex flex-col gap-3 hover:shadow-lg transition-all duration-200 group relative">
      <div className="flex flex-row gap-3 items-start">
        <TodoCheckbox id={id} isCompleted={isCompleted} />
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className={`text-base font-medium text-foreground truncate ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
            {title}
          </h2>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mt-auto">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {CalculateRemainingTime(endDate)}
        </p>

        <div className="flex flex-row items-center gap-1.5">
          <p className="text-xs text-muted-foreground">Priority:</p>
          <div className="flex flex-row gap-0.5 items-center">
            {priority === "LOW" && (
              <span className={`h-1.5 w-1.5 rounded-full ${priorityColor}`}></span>
            )}
            {priority === "MEDIUM" && (
              <>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityColor}`}></span>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityColor}`}></span>
              </>
            )}
            {priority === "HIGH" && (
              <>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityColor}`}></span>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityColor}`}></span>
                <span className={`h-1.5 w-1.5 rounded-full ${priorityColor}`}></span>
              </>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          Status: <span className={`${statusColor} font-medium`}>{status}</span>
        </p>
      </div>

      <div className="absolute top-2 right-2 flex flex-row items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <EditTodoButton todo={todo} />
        <DeleteTodoButton id={id} />
      </div>
    </div>
  );
};

export default Todo;
