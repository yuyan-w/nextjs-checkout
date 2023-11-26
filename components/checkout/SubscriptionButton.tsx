import React from "react";
import Stripe from "stripe";
import { Button } from "../ui/button";
import {
  getLevelFromMetadata,
  getSubscriptionCheckoutURL,
} from "@/feature/stripe/stripe";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type SubscriptionButtonProps = {
  price: Pick<Stripe.Price, "id" | "metadata">;
};

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = async ({
  price,
}) => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const checkoutUrl =
    (await getSubscriptionCheckoutURL({
      userId: session.user.id,
      priceId: price.id,
    })) || "/";
  const buttonVariant =
    getLevelFromMetadata(price.metadata) === "Premium" ? "premium" : "standard";
  return (
    <Button
      className="w-full cursor-pointer font-bold text-base"
      variant={buttonVariant}
      asChild
    >
      <a href={checkoutUrl}>コースに登録する</a>
    </Button>
  );
};
