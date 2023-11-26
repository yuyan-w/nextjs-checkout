import { ArticleList } from "@/components/article/ArticleList";
import { ArticleListSkeleton } from "@/components/article/ArticleSkeletonList";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="max-w-screen-md mx-auto">
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
