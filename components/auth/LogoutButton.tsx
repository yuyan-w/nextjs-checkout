"use client";

import { signOut } from "next-auth/react";
import React from "react";

export const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button className="w-full text-left" onClick={async () => handleClick()}>
      ログアウト
    </button>
  );
};
