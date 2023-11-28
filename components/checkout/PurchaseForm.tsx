import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getArticleById } from "@/feature/store/article";
import { ArticleAccessLevelType } from "@prisma/client";
import {
  PREMIUM_PRICE,
  STANDARD_PRICE,
} from "@/feature/constraints/constraints";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { getPurchaseCheckoutURL } from "@/feature/stripe/stripe";
import { Button } from "../ui/button";

type PurchaseFormProps = {
  articleId: string | undefined;
};

export const PurchaseForm: React.FC<PurchaseFormProps> = async ({
  articleId,
}) => {
  if (articleId === undefined) {
    return null;
  }
  const article = await getArticleById(articleId);
  if (article === null) {
    return null;
  }
  const session = await getAuthSession();
  if (session === null) {
    redirect("/login");
  }

  const checkoutUrl =
    (await getPurchaseCheckoutURL({
      userId: session.user.id,
      article,
    })) || "/";

  const articlePrice =
    article.accessLevel === ArticleAccessLevelType.Premium
      ? PREMIUM_PRICE
      : STANDARD_PRICE;

  return (
    <>
      <Card className="bg-white w-[320px] flex flex-col items-center h-[500px] hover:scale-[1.05] transition duration-300 mt-14">
        <CardHeader className="space-y-2 h-32 w-full">
          <CardTitle className="text-center w-full">記事の購入</CardTitle>
          <CardDescription className="w-full">{`「${article.title}」の記事を購入します`}</CardDescription>
        </CardHeader>
        <CardContent className="mt-12">
          <div className="text-xl font-bold text-gray-700">{`￥${articlePrice.toLocaleString(
            "en-US"
          )}円`}</div>
        </CardContent>
        <CardFooter className="mt-auto w-full">
          <Button
            className="w-full cursor-pointer font-bold text-base"
            variant={"default"}
            asChild
          >
            <a href={checkoutUrl}>記事を購入する</a>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
