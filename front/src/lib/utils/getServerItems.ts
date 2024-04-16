import { cache } from "react";
import "server-only";

//サーバーでのみ行われるデータ取得メソッド

export const preload = (id: string) => {
  void getCategoryList();
};

export const getCategoryList = cache(async () => {
  const res = await fetch(
    "http://localhost:8000/eatfish_back/search/allcategory"
  );

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const result = await res.json();
  return result;
});
