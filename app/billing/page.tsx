import React from "react";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Billing } from "@/components/billing/Billing";

export const page = async () => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="max-w-screen-sm mx-auto">
      <Billing session={session} />
    </main>
  );
};

export default page;
