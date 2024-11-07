"use client";

import { updateCompletedStatus } from "@/actions/Todo/UpdateTodo";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface TodoCheckboxProps {
  isCompleted: boolean;
  id: string;
}

const TodoCheckbox = ({ isCompleted, id }: TodoCheckboxProps) => {
  const queryClient = useQueryClient();
  const checkboxMutation = useMutation({
    mutationFn: async ({ id, isCompleted }: TodoCheckboxProps) =>
      updateCompletedStatus(id, !isCompleted),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleCheckboxClick = () => {
    checkboxMutation.mutate({ id, isCompleted });
  };

  return (
    <Checkbox
      className="w-8 h-8 rounded-lg zoom-in-125"
      checked={isCompleted}
      onClick={handleCheckboxClick}
      disabled={checkboxMutation.isPending}
    />
  );
};

export default TodoCheckbox;
