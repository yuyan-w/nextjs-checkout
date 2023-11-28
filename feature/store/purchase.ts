import prisma from "@/lib/prisma";
import Stripe from "stripe";

export const getPurchasesByUserIdWithArticle = async ({
  userId,
}: {
  userId: string;
}) => {
  try {
    const purchases = await prisma.purchase.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { article: true },
    });
    return purchases;
  } catch (error) {
    throw error;
  }
};

export const updatePurchase = async ({
  userId,
  articleId,
  paymentIntent,
}: {
  userId: string;
  articleId: string;
  paymentIntent: Stripe.PaymentIntent;
}) => {
  try {
    await prisma.purchase.update({
      where: {
        userId_articleId: { userId, articleId },
      },
      data: {
        paymentIntentId: paymentIntent.id,
        paymentStatus: paymentIntent.status,
        amount: paymentIntent.amount,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const createPurchase = async ({
  userId,
  articleId,
  paymentIntent,
}: {
  userId: string;
  articleId: string;
  paymentIntent: Stripe.PaymentIntent;
}) => {
  try {
    await prisma.purchase.create({
      data: {
        userId,
        articleId,
        paymentIntentId: paymentIntent.id,
        paymentStatus: paymentIntent.status,
        amount: paymentIntent.amount,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getPurchase = async ({
  userId,
  articleId,
}: {
  userId: string;
  articleId: string;
}) => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_articleId: {
          userId: userId,
          articleId: articleId,
        },
      },
    });
    return purchase;
  } catch (error) {
    throw error;
  }
};
