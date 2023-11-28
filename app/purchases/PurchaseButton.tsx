"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { fetchPaymentIntentCancel, fetchPaymentIntentCapture } from "./action";
import { useRouter } from "next/navigation";

type PurchaseButtonProps = {
  paymentIntentId: string;
};

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  paymentIntentId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (action: string) => {
    setIsLoading(true);
    try {
      switch (action) {
        case "confirm": {
          await fetchPaymentIntentCapture({ paymentIntentId });
          break;
        }
        case "cancel": {
          await fetchPaymentIntentCancel({ paymentIntentId });
          break;
        }
        default: {
          return;
        }
      }
      router.refresh();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-x-4">
      <Button
        disabled={isLoading}
        className="font-bold"
        onClick={() => handleClick("confirm")}
      >
        購入を確定する
      </Button>
      <Button
        disabled={isLoading}
        className="font-bold"
        variant={"destructive"}
        onClick={() => handleClick("cancel")}
      >
        キャンセル
      </Button>
    </div>
  );
};
