"use server";

import { stripe } from "@/lib/stripe";

export const fetchPaymentIntentCapture = async ({
  paymentIntentId,
}: {
  paymentIntentId: string;
}) => {
  try {
    await stripe.paymentIntents.capture(paymentIntentId);
  } catch (error) {
    throw error;
  }
};

export const fetchPaymentIntentCancel = async ({
  paymentIntentId,
}: {
  paymentIntentId: string;
}) => {
  try {
    await stripe.paymentIntents.cancel(paymentIntentId);
  } catch (error) {
    throw error;
  }
};
