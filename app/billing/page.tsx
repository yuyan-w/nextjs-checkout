import React from "react";
import { getUserById } from "@/feature/store/user";
import { getAuthSession } from "@/lib/nextauth";
import { getBillingPortalURL } from "@/feature/stripe/stripe";

export const page = async () => {
  const session = await getAuthSession();
  if (!session) {
    return <div>請求はありません</div>;
  }
  const user = await getUserById({ userId: session.user.id });
  if (!user || !user.customerId) {
    return <div>請求はありません</div>;
  }

  const url = await getBillingPortalURL({
    customerId: user.customerId,
    returnPath: "/billing",
  });
  return <a href={url}>プランの管理</a>;
};

export default page;
