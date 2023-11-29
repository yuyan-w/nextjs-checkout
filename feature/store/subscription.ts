import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { Subscription, SubscriptionLevelType } from "@prisma/client";

export const isValidSubscription = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  // statusが active, trialing の時、有効
  const isValidStatus =
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due";

  // currentPeriodEndの日の終わりまで有効
  const expire = new Date(subscription.currentPeriodEnd);
  expire.setHours(23, 59, 59, 999);

  const isValidExpiry = Date.now() <= expire.getTime();

  return isValidStatus && isValidExpiry;
};

export const getSubscriptionByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });
    return subscription;
  } catch (error) {
    throw error;
  }
};

export const upsertSubscription = async ({
  userId,
  subscription,
  level,
}: {
  userId: string;
  subscription: Stripe.Subscription;
  level: SubscriptionLevelType;
}) => {
  try {
    const upsertSubscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        subscriptionId: subscription.id,
        priceId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        planLevel: level,
        amount: subscription.items.data[0].price.unit_amount ?? undefined,
        period:
          subscription.items.data[0].price.recurring?.interval ?? undefined,
      },
      create: {
        userId: userId,
        subscriptionId: subscription.id,
        priceId: subscription.items.data[0].price.id,
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        planLevel: level,
        amount: subscription.items.data[0].price.unit_amount ?? 0,
        period:
          subscription.items.data[0].price.recurring?.interval ?? "invalid",
      },
    });
    return upsertSubscription;
  } catch (error) {
    throw error;
  }
};
