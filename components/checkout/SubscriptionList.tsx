import { getStripePrices } from "@/feature/stripe/stripe";
import React from "react";
import { SubscriptionItem } from "./SubscriptionItem";

export const SubscriptionList = async () => {
  const prices = await getStripePrices();
  return (
    <>
      {prices.map((price, idx) => (
        <div key={`price-${idx}`}>
          <SubscriptionItem price={price} />
        </div>
      ))}
    </>
  );
};
