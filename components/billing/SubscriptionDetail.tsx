import { Subscription, SubscriptionLevelType } from "@prisma/client";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { isValidSubscription } from "@/feature/store/subscription";

type SubscriptionDetailProps = {
  subscription: Subscription | null;
};

export const getSubscriptionDetails = (subscription: Subscription | null) => {
  // 有効なサブスクリプションが存在しない場合
  if (subscription === null || !isValidSubscription({ subscription })) {
    const planName = "有効なプランはありません";
    const periodEnd = "-";
    const nextPeriodStart = "-";
    const amount = "-";
    const status = "-";
    return { planName, periodEnd, nextPeriodStart, amount, status };
  }

  const name =
    subscription.planLevel === SubscriptionLevelType.Premium
      ? "プレミアムプラン"
      : "スタンダードプラン";
  const period = subscription.period === "year" ? "年払い" : "月払い";
  const planName = `${name}（${period}）`;

  const periodEnd = subscription.currentPeriodEnd.toISOString().split("T")[0];
  // cancelAtPeriodEnd = true の場合、キャンセルされたサブスクなので次回更新日は表示しない
  const nextPeriodStart = subscription.cancelAtPeriodEnd ? "-" : periodEnd;
  const amount = subscription.cancelAtPeriodEnd
    ? "-"
    : `￥${subscription.amount.toLocaleString("en-US")}`;

  let status: string;
  switch (subscription.status) {
    case "active": {
      if (subscription.cancelAtPeriodEnd) {
        status = "キャンセル済み";
        break;
      }
      status = "有効";
      break;
    }
    case "trialing": {
      if (subscription.cancelAtPeriodEnd) {
        status = "お試し期間（キャンセル済み）";
        break;
      }
      status = "お試し期間";
      break;
    }
    case "past_due": {
      status = "支払いに問題が発生しています";
      break;
    }
    default: {
      status = "不明";
    }
  }

  return { planName, periodEnd, nextPeriodStart, amount, status };
};

export const SubscriptionDetail: React.FC<SubscriptionDetailProps> = ({
  subscription,
}) => {
  const { planName, periodEnd, nextPeriodStart, amount, status } =
    getSubscriptionDetails(subscription);

  const rows = [
    { label: "現在のプラン", value: planName },
    { label: "ステータス", value: status },
    { label: "有効期限", value: periodEnd },
    { label: "次回の更新日", value: nextPeriodStart },
    { label: "請求予定金額", value: amount },
  ];

  return (
    <Table>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell align="center" className="font-medium">
              {row.label}
            </TableCell>
            <TableCell align="center">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
