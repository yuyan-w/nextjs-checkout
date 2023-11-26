import React, { Suspense } from "react";
import { PlanSelection } from "./PlanSelection";
import { PurchaseForm } from "./PurchaseForm";
import { SkeletonForm } from "./SkeletonForm";

type CheckoutProps = {
  articleId: string | undefined;
};

export const Checkout: React.FC<CheckoutProps> = ({ articleId }) => {
  return (
    <div className="w-full flex justify-center space-x-4">
      <Suspense fallback={<SkeletonForm />}>
        <PurchaseForm articleId={articleId} />
      </Suspense>
      <PlanSelection />
    </div>
  );
};
