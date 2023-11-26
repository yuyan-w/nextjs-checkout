import { Skeleton } from "../ui/skeleton";

export const ArticleListSkeleton = () => {
  const arr = [1, 2, 3];
  return (
    <div className="space-y-6">
      {arr.map((i) => (
        <ArticleItemSkeleton key={i} />
      ))}
    </div>
  );
};

export const ArticleItemSkeleton = () => {
  return (
    <>
      <div className="bg-white border-2 rounded p-4 flex space-x-4 cursor-pointer shadow-md">
        <Skeleton className="relative w-40 h-40 border-2 flex-shrink-0" />
        <div className="h-40 flex-1 overflow-hidden">
          <Skeleton className="h-8" />
          <Skeleton className="mt-2 h-5" />
          <Skeleton className="mt-1 h-5" />
          <Skeleton className="mt-1 h-5" />
        </div>
      </div>
    </>
  );
};
