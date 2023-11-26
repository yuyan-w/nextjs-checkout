import { LoginForm } from "@/components/auth/LoginForm";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="flex justify-center">
      <LoginForm />
    </main>
  );
};

export default page;
