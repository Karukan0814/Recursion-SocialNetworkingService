import { articleTypeList } from "../constants";
import { ArticleType } from "../type/ArticleInfoTypes";

export function isArticleType(articleType: string): articleType is ArticleType {
  return articleTypeList.includes(articleType);
}
