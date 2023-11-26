import { Article, ArticleAccessLevelType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type ArticleListItemProps = {
  article: Article;
};

export const ArticleListItem: React.FC<ArticleListItemProps> = ({ article }) => {
  return (
    <div className="bg-white">
      <Link
        href={`/articles/${article.id}`}
        className="border-2 rounded p-4 flex space-x-4 cursor-pointer hover:scale-[1.01] transition duration-300 shadow-md hover:shadow-lg"
      >
        <div className="relative w-40 h-40 border-2 flex-shrink-0 z-0">
          {article.accessLevel === ArticleAccessLevelType.Premium && (
            <div className="absolute bg-premium text-xs px-1 z-50">PREMIUM</div>
          )}
          {article.accessLevel === ArticleAccessLevelType.Standard && (
            <div className="absolute bg-standard text-xs px-1 z-50">
              STANDARD
            </div>
          )}
          <Image
            className="object-cover"
            src={article.image || "/images/no-image.jpeg"}
            fill
            sizes="160px"
            alt={"article image"}
          />
        </div>
        <div className="h-40 flex-1 overflow-hidden">
          <h2 className="text-2xl font-bold truncate">{article.title}</h2>
          <p className="text-gray-500 text-sm pt-2">{article.content}</p>
        </div>
      </Link>
    </div>
  );
};
