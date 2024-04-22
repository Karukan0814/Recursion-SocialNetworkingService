import { ArticleType } from "../type/ArticleInfoTypes";

export function getJapaneseSeason(season: string) {
  switch (season) {
    case "SPRING":
      return "春";
    case "SUMMER":
      return "夏";
    case "AUTUMN":
      return "秋";
    case "WINTER":
      return "冬";
    default:
      return season;
  }
}
export function getJapaneseName(articleType: string) {
  switch (articleType) {
    case "RECIPE":
      return "レシピ";
    case "SHOP":
      return "魚屋";
    case "ONLINE":
      return "お取り寄せ";
    case "COMMENT":
      return "コメント";
    case "LIKE":
      return "いいね";
    case "BOOKMARK":
      return "ブックマーク";
    case "USER":
      return "作成した記事";
    default:
      return articleType;
  }
}
