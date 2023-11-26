import React from "react";
import { notFound, redirect } from "next/navigation";
import { ArticleDetail } from "@/components/article/ArticleDetail";
import { getArticleById } from "@/feature/store/article";
import {
  Article,
  ArticleAccessLevelType,
  SubscriptionLevelType,
} from "@prisma/client";
import { getAuthSession } from "@/lib/nextauth";
import {
  getSubscriptionByUserId,
  isValidSubscription,
} from "@/feature/store/subscription";
import { getPurchase } from "@/feature/store/purchase";

const canUserAccessPage = async ({ article }: { article: Article }) => {
  // 記事がフリーなら全員読める
  if (article.accessLevel === ArticleAccessLevelType.Free) {
    return;
  }

  const session = await getAuthSession();
  if (session === null) {
    redirect("/login");
  }

  const subscription = await getSubscriptionByUserId({
    userId: session.user.id,
  });

  // サブスクがプレミアムの場合
  if (
    subscription !== null &&
    subscription.planLevel === SubscriptionLevelType.Premium &&
    isValidSubscription({ subscription })
  ) {
    return;
  }

  // サブスクがスタンダードの場合
  if (
    subscription !== null &&
    subscription.planLevel === SubscriptionLevelType.Standard &&
    isValidSubscription({ subscription })
  ) {
    // スタンダード記事なら、読める
    if (article.accessLevel === ArticleAccessLevelType.Standard) {
      return;
    }
  }

  const purchase = await getPurchase({
    userId: session.user.id,
    articleId: article.id,
  });
  if (purchase !== null) {
    return;
  }

  const params = new URLSearchParams();
  params.set("article_id", article.id);

  redirect(`/checkout?${params.toString()}`);
};

const page = async ({ params }: { params: { id: string } }) => {
  const articleId = params.id;
  const article = await getArticleById(articleId);

  if (!article) {
    notFound();
  }

  await canUserAccessPage({ article });

  return (
    <main className="max-w-screen-md mx-auto bg-white">
      <ArticleDetail article={article} />
    </main>
  );
};

export default page;
