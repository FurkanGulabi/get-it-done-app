import { Priority, TodoStatus } from "@prisma/client";

export type TodoType = {
  todo: {
    id: string;

    title: string;

    description?: string | null;

    isCompleted: boolean;

    status: TodoStatus;

    priority: Priority;

    endDate: Date;

    userId: string;

    createdAt: Date;

    updatedAt: Date;
  };
};
