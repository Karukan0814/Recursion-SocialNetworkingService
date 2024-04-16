export const getRandomItemFromList = (list: Array<any>) => {
  // selectedCategoriesのコピーを作成
  const categoriesCopy = [...list];

  // 配列が空でない場合
  if (list.length > 0) {
    // 配列からランダムな要素のインデックスを選ぶ
    const randomIndex = Math.floor(Math.random() * categoriesCopy.length);

    // 選ばれた要素を取り出す
    const randomItem = categoriesCopy.splice(randomIndex, 1)[0];

    // 選ばれた要素を返す
    return randomItem;
  }

  // 配列が空の場合はnullを返す
  return null;
};
