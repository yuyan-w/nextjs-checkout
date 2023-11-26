import { Checkout } from "@/components/checkout/Checkout";
import { createCustomerId } from "@/feature/stripe/stripe";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const query = searchParams.article_id;
  const articleId = Array.isArray(query) ? undefined : query;

  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  await createCustomerId({ userId: session.user.id });

  return (
    <div className="">
      <Checkout articleId={articleId}/>
    </div>
  );
};

export default page;
