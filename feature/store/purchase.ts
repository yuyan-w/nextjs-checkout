import prisma from "@/lib/prisma";

export const createPurchase = async ({
  userId,
  articleId,
}: {
  userId: string;
  articleId: string;
}) => {
  try {
    await prisma.purchase.create({
      data: {
        userId,
        articleId,
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
