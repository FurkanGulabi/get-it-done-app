"use client";
import { deleteMyAccount } from "@/actions/auth/Auth";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
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
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const DeleteMyAccount = () => {

    const [disabled, setDisabled] = useState(true);
    const [input, setInput] = useState("");
    const [isPending, startTransition] = useTransition();

    const router = useRouter();

    const handleDeleteAccount = () => {
        startTransition(async () => {
            const result = await deleteMyAccount();
            if (result?.error) {
                toast.error(result.error);
            } else if (result?.success) {
                toast.success("Account deleted successfully");
                router.refresh();

            }
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="flex items-center justify-center border-destructive text-destructive hover:bg-destructive/10"
                >
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-sm">
                        This action cannot be undone. This will permanently delete your
                        account and todos and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="mt-4">
                    <p className="text-muted-foreground text-sm ">
                        enter <strong>delete my account</strong> below
                    </p>
                    <Input
                        value={input}
                        disabled={isPending}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setDisabled(e.target.value !== "delete my account");
                        }}
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            className="flex items-center bg-transparent justify-center border-destructive text-destructive hover:bg-destructive/10"
                            variant={"outline"}
                            disabled={disabled || isPending}
                            onClick={handleDeleteAccount}
                        >
                            Delete
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteMyAccount;
