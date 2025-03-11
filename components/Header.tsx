import { auth, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { FcGoogle } from "react-icons/fc";
import UserButton from "./auth/UserButton";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full p-8 border-b backdrop-blur-md fixed z-10">
      <div className="mx-auto flex items-center justify-between w-3/4">
        <Link
          href="/"
          className="flex flex-row items-center justify-center gap-2"
        >
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
          <h1 className="text-3xl font-bold">GetItDone</h1>
        </Link>

        {session && session.user ? (
          <Suspense
            fallback={<Skeleton className="rounded-full w-[40px] h-[40px]" />}
          >
            <UserButton image={session?.user.image} session={session} />
          </Suspense>
        ) : (
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <Button
              type="submit"
              variant={"outline"}
              className="flex flex-row justify-between py-5"
            >
              <FcGoogle />
              <span>Sign in with Google</span>
            </Button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
