"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EditTodoSchema } from "@/schemas/EditTodoSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartDatetimeInput } from "@/components/ui/smart-date-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoType } from "@/types/TodoType";
import { updateEditTodo } from "@/actions/Todo/UpdateTodo";

const EditTodoButton = ({ todo }: TodoType) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof EditTodoSchema>>({
    resolver: zodResolver(EditTodoSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description || "",
      endDate: todo.endDate,
      priority: todo.priority,
      status: todo.status,
    },
  });
  const editTodoMutation = useMutation({
    mutationFn: ({
      values,
      todoId,
    }: {
      values: z.infer<typeof EditTodoSchema>;
      todoId: string;
    }) => updateEditTodo(values, todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof EditTodoSchema>) => {
    editTodoMutation.mutate({ values, todoId: todo.id });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded-full">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogDescription>Edit your todo</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Title"
                      disabled={editTodoMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description"
                      disabled={editTodoMutation.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-row justify-between items-center space-x-3">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                      disabled={editTodoMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                        <SelectItem value="POSTPONED">Postponed</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      required
                      disabled={editTodoMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <SmartDatetimeInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="e.g. Tomorrow morning 9am"
                      disabled={editTodoMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>Please select the full time</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={editTodoMutation.isPending}>
                {editTodoMutation.isPending ? "Editing..." : "Edit Todo"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoButton;
