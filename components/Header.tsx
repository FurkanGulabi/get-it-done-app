import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import UserButton from "./auth/UserButton";
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
        <Suspense
          fallback={<Skeleton className="rounded-full w-[40px] h-[40px]" />}
        >
          <UserButton isLoggedIn={!!session} image={session?.user.image} />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
