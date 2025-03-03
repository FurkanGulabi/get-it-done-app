"use client";

import { updateCompletedStatus } from "@/actions/Todo/UpdateTodo";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";
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
    <div className="relative group">
      <Checkbox
        className={`size-7 rounded-full border-2 transition-all duration-200 relative
          ${isCompleted
            ? 'bg-primary border-primary hover:bg-primary/90 hover:border-primary/90'
            : 'border-muted-foreground/30 hover:border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary'
          } 
          ${checkboxMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        checked={isCompleted}
        onClick={handleCheckboxClick}
        disabled={checkboxMutation.isPending}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Check className={`h-3 w-3 text-primary-foreground transition-all duration-200 
            ${isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
          />
        </div>
      </Checkbox>
      {checkboxMutation.isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-primary/50 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default TodoCheckbox;
