export const getSeason = (month: number): Season => {
  // 3月、4月、5月が春、6月、7月、8月が夏、9月、10月、11月が秋、12月、1月、2月が冬とする例
  if (month >= 3 && month <= 5) return "SPRING";
  else if (month >= 6 && month <= 8) return "SUMMER";
  else if (month >= 9 && month <= 11) return "AUTUMN";
  else return "WINTER";
};

export function getSeasonCategoryList(categoriesData?: Categories) {
  const date = new Date();
  const currentMonth = date.getMonth() + 1; // JavaScript の Date オブジェクトでは月が 0 から始まるため +1 する

  let seasonalCategories: Categories = [];
  if (categoriesData) {
    // カテゴリデータをブラウザの日付に基づいて季節ごとに分類する
    seasonalCategories = categoriesData.filter((category) => {
      return category.season === getSeason(currentMonth);
    });
  }
  return seasonalCategories;
}
