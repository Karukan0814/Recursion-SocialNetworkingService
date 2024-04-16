import {
  ArticleInfo,
  ArticlesCategorizedByActions,
} from "../type/ArticleInfoTypes";

export const findArticleById = (
  articlesByActions: ArticlesCategorizedByActions,
  articleId: number
): ArticleInfo | undefined => {
  for (const category in articlesByActions) {
    const foundArticle = articlesByActions[
      category as keyof ArticlesCategorizedByActions
    ].find((article) => article.id === articleId);
    if (foundArticle) {
      return foundArticle;
    }
  }
  return undefined;
};
