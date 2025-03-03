"use client";
import { generateDescriptionFromTitle } from "@/actions/AI/generateText";
import { AddTodo } from "@/actions/Todo/AddTodo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SmartDatetimeInput } from "@/components/ui/smart-date-input";
import { Textarea } from "@/components/ui/textarea";
import { AddTodoSchema } from "@/schemas/AddTodoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Stars } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AddTodoButton = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof AddTodoSchema>>({
    resolver: zodResolver(AddTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      endDate: new Date(),
      priority: "MEDIUM",
      status: "ONGOING",
    },
  });

  const newTodoMutation = useMutation({
    mutationFn: (values: z.infer<typeof AddTodoSchema>) => AddTodo(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setOpen(false);
      form.reset();
    },
  });

  const onSubmit = (values: z.infer<typeof AddTodoSchema>) => {
    newTodoMutation.mutate(values);
  };

  const handleGenerateDescription = async () => {
    const title = form.getValues("title");
    if (!title) {
      form.setError("title", {
        type: "manual",
        message: "Please enter a title first to generate a description",
      });
      return;
    }

    try {
      setIsGenerating(true);
      const result = await generateDescriptionFromTitle(title);

      if (result.error) {
        toast.error(result.error);
      } else if (result.output) {
        form.setValue("description", result.output);
        toast.success("Description generated!");
      }
    } catch (error) {
      console.error("Failed to generate description:", error);
      toast.error("Failed to generate description");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={true}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          <span>Add Todo</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogDescription>Add new todo</DialogDescription>
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
                      disabled={newTodoMutation.isPending}
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
                    <div className="relative">
                      <Textarea
                        {...field}
                        placeholder="Description"
                        disabled={newTodoMutation.isPending || isGenerating}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleGenerateDescription}
                        disabled={newTodoMutation.isPending || isGenerating || !form.watch("title") || form.watch("title").length < 3}
                        className="absolute top-2 right-2 h-6 w-6 p-0.5 hover:bg-accent hover:text-accent-foreground"
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Stars className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Click the star icon to generate a description using AI
                  </FormDescription>
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
                      disabled={newTodoMutation.isPending}
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
                      disabled={newTodoMutation.isPending}
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
                      disabled={newTodoMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>Please select the full time</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={newTodoMutation.isPending}>
                {newTodoMutation.isPending ? "Adding Todo..." : "Add Todo"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoButton;
