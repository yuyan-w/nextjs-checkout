import React, { Suspense } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserCard } from "../auth/UserCard";
import { Session } from "next-auth";
import { getUserByIdWithSubscription } from "@/feature/store/user";
import { SubscriptionDetail } from "./SubscriptionDetail";
import { Button } from "../ui/button";
import Link from "next/link";
import { BillingPortalLink } from "./BillingPortalLink";
import { Skeleton } from "../ui/skeleton";

type BillingProps = {
  session: Session;
};

export const Billing: React.FC<BillingProps> = async ({ session }) => {
  const user = await getUserByIdWithSubscription({ userId: session.user.id });
  if (user === null) {
    return <div>user === null</div>;
  }

  return (
    <Card className="py-12 px-16 space-y-8">
      <CardContent>
        <UserCard user={user} />
      </CardContent>
      <CardContent>
        <SubscriptionDetail subscription={user.subscription} />
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 p-4">
        <Suspense fallback={<Skeleton className="w-[325px] h-10" />}>
          <BillingPortalLink customerId={user.customerId} />
        </Suspense>
        <Button asChild size={"sm"} variant={"link"}>
          <Link href="/refund-policy">返金ポリシー</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
