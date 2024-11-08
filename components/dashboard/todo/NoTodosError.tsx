"use client";
import { AlertCircle } from "lucide-react";

export default function NoTodosError() {
  return (
    <div className="flex flex-col w-full items-center justify-center p-8 bg-background rounded-lg shadow-md">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
        <AlertCircle className="w-8 h-8 text-primary" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        No Todos Found
      </h2>
      <p className="mb-4 text-center text-muted-foreground">
        It looks like you haven&apos;t added any todos yet.
      </p>
    </div>
  );
}
