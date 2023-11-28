import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Subscription, SubscriptionLevelType } from "@prisma/client";
import { PlanChangeButton } from "./PlanChangeButton";

type PlanChangeFormProps = {
  subscription: Subscription;
};

export const PlanChangeForm: React.FC<PlanChangeFormProps> = ({
  subscription,
}) => {
  const planLevel =
    subscription.planLevel === SubscriptionLevelType.Premium
      ? "プレミアム"
      : "スタンダード";
  return (
    <Card className="bg-white max-w-xs flex flex-col items-center h-[500px] hover:scale-[1.05] transition duration-300 mt-14">
      <CardHeader className="space-y-2 h-32">
        <CardTitle className="text-center">プラン変更</CardTitle>
      </CardHeader>
      <CardContent className="mt-12">
        <p>{`現在のプランは ${planLevel} です。`}</p>
      </CardContent>
      <CardFooter className="mt-auto w-full">
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <PlanChangeButton />
        </Suspense>
      </CardFooter>
    </Card>
  );
};
