"use client";
import { signIn, signOut } from "@/actions/auth/Auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
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

interface UserButtonProps {
  isLoggedIn: boolean;
  image: string;
}

const UserButton = ({ isLoggedIn, image }: UserButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const data = await signIn();
    if (data?.error) {
      toast.error(data.error);
    } else if (data?.success) {
      toast.success(data.success);
    } else {
      toast.error("Somewthing went wrong, please try again");
    }
    setLoading(false);
  };

  const handleSignOutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await signOut();
    if (data?.error) {
      toast.error(data.error);
    } else if (data?.success) {
      toast.success(data.success);
    } else {
      toast.error("Something went wrong, please try again");
    }
  };

  if (!isLoggedIn) {
    return (
      <Button
        variant={"outline"}
        className="flex flex-row justify-between py-5"
        onClick={handleSignIn}
      >
        <FcGoogle />
        <span>Sign in with Google</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={image} alt="User Image" />
          <AvatarFallback>
            <Skeleton className="rounded-full w-[40px] h-[40px]" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <form onSubmit={handleSignOutSubmit}>
            <Button
              type="submit"
              className="w-full text-foreground text-left hover:bg-destructive hover:text-destructive-foreground transition-all h-8 bg-transparent flex justify-start gap-2 p-2 "
              disabled={loading}
            >
              <LogOut />
              <span>Sign out</span>
            </Button>
          </form>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
