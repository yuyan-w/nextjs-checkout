import React, { Suspense } from "react";
import Stripe from "stripe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SubscriptionButton } from "./SubscriptionButton";
import { Skeleton } from "../ui/skeleton";

type SubscriptionItemProps = {
  price: Stripe.Price;
};

export const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  price,
}) => {
  const product = price.product as Stripe.Product;
  return (
    <Card className="bg-white max-w-xs flex flex-col items-center h-[500px] hover:scale-[1.05] transition duration-300">
      <CardHeader className="space-y-2 h-32">
        <CardTitle className="text-center">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-12">
        <div className="text-xl font-bold text-gray-700">
          ￥{(price.unit_amount || 0).toLocaleString("en-US")}円 / 月
        </div>
      </CardContent>
      <CardFooter className="mt-auto w-full">
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <SubscriptionButton price={price} />
        </Suspense>
      </CardFooter>
    </Card>
  );
};
