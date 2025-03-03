"use client";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function NoTodosError() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col w-full items-center justify-center p-8 bg-card border-border rounded-lg shadow-sm border"
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
        <AlertCircle className="w-8 h-8 text-primary" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        No Todos Found
      </h2>
      <p className="mb-4 text-center text-muted-foreground">
        It looks like you haven&apos;t added any todos yet. Click the &quot;Add
        Todo&quot; button above to get started!
      </p>
    </motion.div>
  );
}
