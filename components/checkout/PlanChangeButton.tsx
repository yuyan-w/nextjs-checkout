import React from "react";
import { getUserById } from "@/feature/store/user";
import { getAuthSession } from "@/lib/nextauth";
import { getBillingPortalURL } from "@/feature/stripe/stripe";
import { Button } from "../ui/button";

export const PlanChangeButton = async () => {
  const session = await getAuthSession();
  if (!session) {
    return null;
  }
  const user = await getUserById({ userId: session.user.id });
  if (!user || !user.customerId) {
    return null;
  }

  const url = await getBillingPortalURL({
    customerId: user.customerId,
    returnPath: "/checkout",
  });
  return (
    <Button className="w-full cursor-pointer font-bold text-base" asChild>
      <a href={url}>プランを変更する</a>
    </Button>
  );
};
