import React from "react";
import { ArticleListItem } from "./ArticleListItem";
import { getAllArticlesForList } from "@/feature/store/article";

export const ArticleList = async () => {
  const articles = await getAllArticlesForList();
  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div key={`article-${index}`}>
          <ArticleListItem article={article} />
        </div>
      ))}
    </div>
  );
};
