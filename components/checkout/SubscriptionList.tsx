import { getStripePrices } from "@/feature/stripe/stripe";
import React from "react";
import { SubscriptionItem } from "./SubscriptionItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SubscriptionList = async () => {
  const prices = await getStripePrices();
  const monthlyPrices = prices.filter((p) => p.recurring?.interval === "month");
  const annualPrices = prices.filter((p) => p.recurring?.interval === "year");
  return (
    <>
      <Tabs
        defaultValue="monthly"
        className="flex flex-col items-center space-y-4"
      >
        <TabsList className="grid grid-cols-2 w-[300px]">
          <TabsTrigger value="monthly">月払い</TabsTrigger>
          <TabsTrigger value="annual">年払い</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="">
          <div className="flex space-x-4">
            {monthlyPrices.map((price, idx) => (
              <div key={`price-${idx}`}>
                <SubscriptionItem price={price} interval="月" />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="annual" className="">
          <div className="flex space-x-4">
            {annualPrices.map((price, idx) => (
              <div key={`price-${idx}`}>
                <SubscriptionItem price={price} interval="年" />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
