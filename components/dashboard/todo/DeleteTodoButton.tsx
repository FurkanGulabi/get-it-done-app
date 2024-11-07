"use client";
import { deleteTodo } from "@/actions/Todo/DeleteTodo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
  id: string;
}

const DeleteTodoButton = ({ id }: DeleteButtonProps) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => await deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully");
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.error("Failed to delete todo");
    },
  });

  const handleDelete = async () => {
    console.log("handling");

    deleteTodoMutation.mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} className="rounded-full">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Todo
            from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => toast.success("invoked")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodoButton;
