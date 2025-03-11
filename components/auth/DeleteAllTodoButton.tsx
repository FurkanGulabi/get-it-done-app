"use client";
import { deleteAllTodos } from "@/actions/Todo/DeleteTodo"; // Renamed for consistency
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
import React, { useTransition } from "react";
import { toast } from "sonner";

const DeleteAllTodoButton = () => {
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const deleteAllTodosMutation = useMutation({
        mutationFn: deleteAllTodos, // Matches renamed import
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast.success("All todos deleted successfully");
        },
        onError: (error) => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });

            toast.error(
                `Failed to delete todos: ${error.message || "Unknown error"}`
            );
        },
    });

    const handleDeleteAllTodos = () => {
        startTransition(async () => {
            await deleteAllTodosMutation.mutateAsync(); // Use mutateAsync for proper async handling
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isPending}>
                    Delete All Todos
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. All todos will be permanently deleted
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDeleteAllTodos}
                        disabled={isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAllTodoButton;
