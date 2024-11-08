"use client";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TodoServerError() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col w-full items-center justify-center p-8 bg-background rounded-lg shadow-md ">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-destructive/10">
        <AlertOctagon className="w-8 h-8 text-destructive" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        Server Error
      </h2>
      <p className="mb-4 text-center text-muted-foreground">
        We&apos;re having trouble connecting to the server. This could be due to
        a network issue or a problem on our end.
      </p>
      <Button
        onClick={handleRetry}
        variant="outline"
        className="flex items-center justify-center border-destructive text-destructive hover:bg-destructive/10"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Retry Connection
      </Button>
    </div>
  );
}
