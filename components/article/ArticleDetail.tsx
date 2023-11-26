import { Article, ArticleAccessLevelType } from "@prisma/client";
import Image from "next/image";
import React from "react";

type ArticleDetailProps = {
  article: Article;
};

export const ArticleDetail: React.FC<ArticleDetailProps> = async ({
  article,
}) => {
  return (
    <div className="border-2 rounded pt-4 pb-12 flex flex-col space-y-12 shadow-sm items-center p-12">
      <div className="relative w-[480px] h-[480px] border-2 flex-shrink-0 z-0">
        {article.accessLevel === ArticleAccessLevelType.Premium && (
          <div className="absolute bg-premium text-base px-1 z-50">PREMIUM</div>
        )}
        {article.accessLevel === ArticleAccessLevelType.Standard && (
          <div className="absolute bg-standard text-base px-1 z-50">
            STANDARD
          </div>
        )}
        <Image
          className="object-cover"
          src={article.image || "/images/no-image.jpeg"}
          fill
          sizes="480px"
          alt={"article image"}
        />
      </div>
      <div className="w-[480px]">
        <h2 className="text-2xl font-bold truncate">{article.title}</h2>
        <p className="text-gray-500 text-sm pt-2">{article.content}</p>
      </div>
    </div>
  );
};
