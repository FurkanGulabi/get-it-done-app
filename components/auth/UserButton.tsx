// UserButton.tsx
"use client";
import { signOut } from "@/actions/auth/Auth";
import { Loader2, LogOut } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";
import Options from "./Options";

interface UserButtonProps {
  image: string;
  session: Session;
}

const UserButton = ({ image, session }: UserButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        const data = await signOut();
        if (data?.error) {
          toast.error(data.error);
        } else if (data?.success) {
          toast.success(data.success);
          router.refresh(); // Refresh the page or redirect if needed
        } else {
          toast.error("Something went wrong, please try again");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error("Sign out error:", error);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 h-auto !bg-transparent hover:!bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt="User Image" />
            <AvatarFallback>
              <Skeleton className="rounded-full w-[40px] h-[40px]" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
          <Options open={open} setOpen={setOpen} session={session} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={handleSignOut}
            className="cursor-pointer text-foreground hover:bg-destructive hover:text-destructive-foreground transition-all"
          >
            {isPending ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              <LogOut className="mr-2" size={16} />
            )}
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;