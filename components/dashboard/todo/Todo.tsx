"use client";

import React from "react";
import DeleteTodoButton from "./DeleteTodoButton";
import { TodoType } from "@/types/TodoType";
import { CalculateRemainingTime } from "@/lib/CalculateRemainingTime";
import TodoCheckbox from "./TodoCheckbox";
import EditTodoButton from "./EditTodoButton";

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
    <div className="w-full border p-12 rounded-lg flex flex-row items-center gap-2 justify-between max-h-40">
      <div className="flex flex-row gap-2 items-center">
        <TodoCheckbox id={id} isCompleted={isCompleted} />
        <div className="flex flex-col">
          <h2>{title}</h2>
          <p className="text-muted-foreground text-[16px] w-full max-w-md text-wrap">
            {description}
          </p>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground text-[16px]">
          Ending: {CalculateRemainingTime(endDate)}
        </p>
        {/* Add proiority and status */}

        <div className="flex flex-row items-center gap-2">
          <p className="text-muted-foreground text-[16px]">Priority: </p>

          <div className=" flex flex-row gap-2 items-center">
            {priority === "LOW" && (
              <span className={`h-3 w-3 rounded-full ${priorityColor}`}></span>
            )}
            {priority === "MEDIUM" && (
              <>
                <span
                  className={`h-3 w-3 rounded-full ${priorityColor}`}
                ></span>
                <span
                  className={`h-3 w-3 rounded-full ${priorityColor}`}
                ></span>
              </>
            )}
            {priority === "HIGH" && (
              <>
                <span
                  className={`h-3 w-3 rounded-full ${priorityColor}`}
                ></span>
                <span
                  className={`h-3 w-3 rounded-full ${priorityColor}`}
                ></span>
                <span
                  className={`h-3 w-3 rounded-full ${priorityColor}`}
                ></span>
              </>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-[16px]">
          Status: <span className={statusColor}>{status}</span>
        </p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <EditTodoButton todo={todo} />
        <DeleteTodoButton id={id} />
      </div>
    </div>
  );
};

export default Todo;
