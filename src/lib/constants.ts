export const homeRoute = "/";
export const eatfishRoute = "/EatFish";
export const fishListRoute = "/fishList";
export const recipeRoute = "/articles/RECIPE";
export const shopRoute = "/articles/SHOP";
export const onlineRoute = "/articles/ONLINE";
export const myPageRoute = "/myPage";
export const profileRoute = "/profile";
export const searchRoute = "/search";

export const pages: RouteInfo[] = [
  { title: "お魚喰えよ", path: "/EatFish" },
  { title: "お魚図鑑", path: "/fishList" },

  { title: "レシピ", path: "/articles/RECIPE" },
  { title: "魚屋", path: "/articles/SHOP" },
  { title: "お取り寄せ", path: "/articles/ONLINE" },

  {
    title: "About me",
    path: "https://karukan0814.github.io/Recursion-ResumeWebsite/",
  },
];

export const articleTypeList = ["RECIPE", "SHOP", "ONLINE"];

export const loadNumPerPage = 20;

export const userActionList = ["COMMENT", "LIKE", "BOOKMARK", "USER"];
export const allCategoryId = 100;
