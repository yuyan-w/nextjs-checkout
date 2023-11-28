import { type User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import React from "react";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

type UserNavigationProps = {
  user: Pick<User, "name" | "image" | "email">;
};

export const UserNavigation: React.FC<UserNavigationProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar size={40} user={user} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white p-2" align="end">
          <div className="w-[250px] flex flex-col items-center pt-2 pb-6">
            <UserAvatar user={user} size={120} />
            <div className="my-2 text-base">{user.name || ""}</div>
            <div className="text-sm">{user.email || ""}</div>
          </div>

          <DropdownMenuSeparator />
          <Link href="/purchases">
            <DropdownMenuItem className="cursor-pointer">
              購入履歴
            </DropdownMenuItem>
          </Link>
          <Link href="/address">
            <DropdownMenuItem className="cursor-pointer">
              住所表示
            </DropdownMenuItem>
          </Link>
          <Link href="/billing">
            <DropdownMenuItem className="cursor-pointer">
              プラン・請求
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
