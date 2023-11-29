import { getBillingPortalURL } from "@/feature/stripe/stripe";
import React from "react";
import { Button } from "../ui/button";

type BillingPortalLinkProps = {
  customerId: string | null;
};

export const BillingPortalLink: React.FC<BillingPortalLinkProps> = async ({
  customerId,
}) => {
  if (customerId === null) {
    return null;
  }

  const url = await getBillingPortalURL({
    customerId: customerId,
    returnPath: "/billing",
  });

  return (
    <Button
      asChild
      className="font-bold cursor-pointer mt-2"
      variant={"default"}
    >
      <a href={url}>プランの詳細確認・変更・キャンセルはこちら</a>
    </Button>
  );
};
