import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import React from "react";
import { UserNavigation } from "../auth/UserNavigation";
import { Button } from "../ui/button";

export const Navigation = async () => {
  const session = await getAuthSession();
  return (
    <header className="bg-white mb-8 text-gray-800 shadow-lg">
      <div className="flex items-center justify-between h-16 px-12">
        <div>
          <Link href="/" className="text-xl font-bold">
            CheckOUT
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          {session?.user ? (
            <>
              <Button size={"sm"} asChild variant={"outline"}>
                <Link href="/checkout">有料会員登録</Link>
              </Button>
              <UserNavigation user={session.user} />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-sky-500 px-4 py-2 text-white hover:bg-sky-400"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
