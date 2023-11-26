import React from "react";
import { SubscriptionList } from "./SubscriptionList";
import {
  getSubscriptionByUserId,
  isValidSubscription,
} from "@/feature/store/subscription";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { PlanChangeForm } from "./PlanChangeForm";

export const PlanSelection = async () => {
  const session = await getAuthSession();
  if (session === null) {
    redirect("/login");
  }
  const subscription = await getSubscriptionByUserId({
    userId: session.user.id,
  });
  const isActive =
    subscription === null ? false : isValidSubscription({ subscription });

  return (
    <>
      {isActive ? (
        <PlanChangeForm subscription={subscription!} />
      ) : (
        <SubscriptionList />
      )}
    </>
  );
};
