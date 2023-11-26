import React from "react";
import { revalidatePath } from "next/cache";

const page = () => {
  revalidatePath("/", "layout");

  return <div>お支払いが正常に完了しました。</div>;
};

export default page;
