import { UserInfoType } from "./UserInfoType";

export type ArticleCount = { totalArticlesCount: number };
export type ArticlesOrder = "likes" | "createdAt";
export type ArticleType = "RECIPE" | "SHOP" | "ONLINE";

//o=レシピ　1=魚屋　2=お取り寄せ

export type ArticleInfo = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  type: ArticleType;
  link: string;
  img: string;

  categories: Categories;
  userId: number;
  comments: CommentInfo[];
  likes: LikesInfo[];
  bookmarks: BookamarkInfo[];
};
export type CategorizedArticles<T extends string> = {
  [key in T]: ArticleInfo[];
};

export type BasicCategorizedArticles = CategorizedArticles<
  "RECIPE" | "SHOP" | "ONLINE"
>;

export type ArticlesCategorizedByActions = CategorizedArticles<
  "COMMENT" | "LIKE" | "BOOKMARK" | "USER"
>;

export type MetaDatafromUrl = {
  title: string;
  image: {
    data: string;
    type: string;
  } | null;
  description: string;
  url: string;
  site_name: string;
  icon: string;
  keywords: string;
};

export type CommentInfo = {
  id: number;
  createdAt: string;
  articleId: number;
  userId: number;
  comment: string;
  user: UserInfoType;
};

export type LikesInfo = {
  id: number;
  userId: number;
  articleId: number;
};
export type BookamarkInfo = {
  id: number;
  userId: number;
  articleId: number;
};
