import { User } from "@prisma/client";
import React from "react";
import { UserAvatar } from "./UserAvatar";

type UserCardProps = {
  user: User;
};

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="flex items-center">
      <div className="w-[120px]">
        <UserAvatar user={user} size={120} />
      </div>
      <div className="flex flex-col items-center w-full">
        <div className="font-bold text-xl">{user.name}</div>
        <div className="text-base">({user.email})</div>
      </div>
    </div>
  );
};
