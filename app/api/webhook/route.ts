import { createPurchase, updatePurchase } from "@/feature/store/purchase";
import { upsertSubscription } from "@/feature/store/subscription";
import { getLevelFromMetadata } from "@/feature/stripe/stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  // リクエストの検証
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  let event: Stripe.Event;
  try {
    if (!sig) throw new Error("No signature");
    event = stripe.webhooks.constructEvent(body, sig, stripeWebhookSecret);
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Bad Request");
    return new NextResponse(`Webhook Error: ${err.message}`, {
      status: 400,
    });
  }

  // イベントの処理
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session: Stripe.Checkout.Session = event.data.object;

        if ("subscription" in session && session.subscription) {
          // サブスクリプションに関する処理
          const shippingDetails = session.shipping_details;
          if (shippingDetails !== null) {
            await stripe.customers.update(session.customer as string, {
              shipping: {
                name: shippingDetails.name!,
                address: {
                  country: shippingDetails.address?.country!,
                  postal_code: shippingDetails.address?.postal_code!,
                  city: shippingDetails.address?.city!,
                  state: shippingDetails.address?.state!,
                  line1: shippingDetails.address?.line1!,
                  line2: shippingDetails.address?.line2!,
                },
              },
            });
          }
        } else if ("payment_intent" in session && session.payment_intent) {
          // 1回限りの支払い（PaymentIntent）の処理
          const paymentIntent = await stripe.paymentIntents.retrieve(
            session.payment_intent as string
          );
          const userId = paymentIntent.metadata.userId;
          const articleId = paymentIntent.metadata.articleId;

          await createPurchase({ userId, articleId, paymentIntent });
        }

        break;
      }
      case "invoice.payment_succeeded": {
        const invoice: Stripe.Invoice = event.data.object;

        // metadata から userId を取得します
        const userId = invoice.subscription_details?.metadata?.userId;
        if (!userId) {
          return new NextResponse("ユーザーIDが存在しません", { status: 400 });
        }

        // stripeから Subscription オブジェクトを取得します
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        );
        const metadata = subscription.items.data[0].price.metadata;
        const planLevel = getLevelFromMetadata(metadata);

        // Subscription オブジェクトを保存します
        await upsertSubscription({
          userId,
          subscription,
          level: planLevel,
        });
        break;
      }
      case "invoice.payment_failed": {
        console.log("サブスクリプションの支払いが失敗しました。");
        break;
      }
      case "payment_intent.succeeded":
      case "payment_intent.canceled":
      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        // サブスクリプションの定期更新の場合はスキップ
        if (paymentIntent.invoice) {
          break;
        }

        const userId = paymentIntent.metadata.userId;
        const articleId = paymentIntent.metadata.articleId;

        await updatePurchase({ userId, articleId, paymentIntent });

        break;
      }
      // サブスクリプションの詳細が更新されたとき
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription: Stripe.Subscription = event.data.object;
        const userId = subscription.metadata.userId;
        if (!userId) {
          return new NextResponse("ユーザーIDが存在しません", { status: 400 });
        }
        const metadata = subscription.items.data[0].price.metadata;
        const planLevel = getLevelFromMetadata(metadata);

        await upsertSubscription({
          userId,
          subscription,
          level: planLevel,
        });
        break;
      }
    }
    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("イベントのハンドルに失敗しました", {
      status: 400,
    });
  }
}
