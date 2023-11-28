import { getPurchasesByUserIdWithArticle } from "@/feature/store/purchase";
import { getAuthSession } from "@/lib/nextauth";
import { Article, Purchase } from "@prisma/client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PurchaseButton } from "./PurchaseButton";

type PurchaseItemProps = {
  purchase: Purchase & { article: Article };
};

// 購入履歴を表示
const PurchaseItem: React.FC<PurchaseItemProps> = ({ purchase }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>「{purchase.article.title}」の記事の購入</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div>
          <p>ステータス: {purchase.paymentStatus}</p>
          <p>￥{purchase.amount}円</p>
        </div>
        {purchase.paymentStatus === "requires_capture" && (
          <div className="mt-auto">
            <PurchaseButton paymentIntentId={purchase.paymentIntentId} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const page = async () => {
  const session = await getAuthSession();
  if (session === null) {
    return <div>session === null</div>;
  }
  const userId = session.user.id;

  const purchases = await getPurchasesByUserIdWithArticle({ userId });
  if (purchases.length === 0) {
    return <div>Purchase.length === 0</div>;
  }

  return (
    <main className="max-w-screen-md mx-auto">
      <div className="space-y-4">
        {purchases.map((p) => (
          <PurchaseItem key={`purchase-${p.id}`} purchase={p} />
        ))}
      </div>
    </main>
  );
};

export default page;
