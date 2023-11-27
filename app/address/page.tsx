import { getUserById } from "@/feature/store/user";
import { getShippingByCustomerID } from "@/feature/stripe/stripe";
import { getAuthSession } from "@/lib/nextauth";
import React from "react";

const page = async () => {
  const session = await getAuthSession();
  if (session === null) {
    return <div>Session === null</div>;
  }
  const user = await getUserById({ userId: session.user.id });
  if (user === null || user.customerId === null) {
    return <div>user(id:{user?.id}) === null</div>;
  }

  const shipping = await getShippingByCustomerID({
    customerId: user.customerId,
  });
  if (shipping === null || shipping.address === undefined) {
    return <div>address === null</div>;
  }

  return (
    <main className="max-w-screen-md mx-auto">
      <p>{shipping.address.country}</p>
      <p>{shipping.address.postal_code}</p>
      <p>{shipping.address.state}</p>
      <p>{shipping.address.line1}</p>
      <p>{shipping.address.line2}</p>
    </main>
  );
};

export default page;
