import { ArticlesCategorizedByActions } from "../type/ArticleInfoTypes";
import { UserInfoType } from "../type/UserInfoType";
import { findArticleById } from "./findArticleById";

export const getBookmarkUpdateArticles = (
  currentArticles: ArticlesCategorizedByActions | null,
  articleId: number,
  newBookmarkState: boolean,
  userInfo: UserInfoType
) => {
  if (!currentArticles) {
    return null;
  }

  const updatedArticles = {} as ArticlesCategorizedByActions;

  // ArticlesCategorizedByActionsのプロパティ名だけ以下をループ
  (
    Object.keys(currentArticles) as Array<keyof ArticlesCategorizedByActions>
  ).forEach((category) => {
    if (category === "BOOKMARK") {
      // "BOOKMARK" タブの記事リストの処理
      // 現在の"BOOKMARK" タブの記事リストに該当記事IDのものがあるか確認。あればarticleIndex>-1になる
      const articleIndex = currentArticles[category].findIndex(
        (article) => article.id === articleId
      );
      if (newBookmarkState) {
        // ブックマーク登録
        if (articleIndex === -1) {
          // 該当する記事が存在しない場合、リストに追加＝他タブで記事にブックマーク処理
          const newBookmarkArticle = findArticleById(
            currentArticles,
            articleId
          ); //他タブから記事情報を取得
          if (newBookmarkArticle) {
            // 記事情報が他タブから取得できた場合、ブックマーク
            newBookmarkArticle.bookmarks.find(
              (bookmark) => bookmark.userId === userInfo.id
            ) ??
              newBookmarkArticle.bookmarks.push({
                id: Date.now(),
                userId: userInfo.id!,
                articleId: articleId,
              });
            updatedArticles[category] = [
              ...currentArticles[category],
              newBookmarkArticle,
            ];
          } else {
            updatedArticles[category] = [...currentArticles[category]];
          }
        }
      } else {
        // ブックマーク解除
        if (articleIndex > -1) {
          // 該当する記事が存在する場合、リストから削除＝ブックマーク解除
          updatedArticles["BOOKMARK"] = currentArticles["BOOKMARK"].filter(
            (article) => article.id !== articleId
          );
        }
      }
    } else {
      // 他のカテゴリの処理
      updatedArticles[category] = currentArticles[category].map((article) => {
        // そのタブの記事リストに該当記事があった場合
        if (article.id === articleId) {
          const updatedArticle = { ...article };

          const currentLikeIndex = updatedArticle.bookmarks.findIndex(
            (bookmark) => bookmark.userId === userInfo.id
          ); //現在のいいねリストの中にユーザーが含まれているかどうか＝すでにその記事にいいねしているかどうか

          if (newBookmarkState) {
            //このアクションがブックマーク登録起因の場合
            if (currentLikeIndex === -1) {
              // ブックマークリストにそのユーザーがいない場合、ユーザーのブックマークをpush
              updatedArticle.bookmarks.push({
                id: Date.now(),
                userId: userInfo.id!,
                articleId: articleId,
              });
            } else {
              // 既にそのユーザーによるブックマーク処理が行われている場合は何もしない
            }
          } else {
            //このアクションがブックマーク削除起因の場合
            if (currentLikeIndex > -1) {
              //ブックマークリストにユーザーが含まれているので削除する
              updatedArticle.bookmarks = updatedArticle.bookmarks.filter(
                (bookmark) => bookmark.userId !== userInfo.id
              );
            }
          }

          return updatedArticle;
        }
        return article;
      });
    }
  });

  return updatedArticles;
};

export const getLikeUpdateArticles = (
  currentArticles: ArticlesCategorizedByActions | null,
  articleId: number,
  newLikeState: boolean,
  userInfo: UserInfoType
) => {
  if (!currentArticles) {
    return null;
  }

  const updatedArticles = {} as ArticlesCategorizedByActions;

  // ArticlesCategorizedByActionsのプロパティ名だけ以下をループ
  (
    Object.keys(currentArticles) as Array<keyof ArticlesCategorizedByActions>
  ).forEach((category) => {
    if (category === "LIKE") {
      // "LIKE" タブの記事リストの処理

      // 現在の"LIKE" タブの記事リストに該当記事IDのものがあるか確認。あればarticleIndex>-1になる
      const articleIndex = currentArticles[category].findIndex(
        (article) => article.id === articleId
      );

      if (articleIndex > -1) {
        // 該当する記事が存在する場合、リストから削除＝いいね解除
        updatedArticles[category] = currentArticles[category].filter(
          (article) => article.id !== articleId
        );
      } else {
        // 該当する記事が存在しない場合、リストに追加＝他タブで記事にいいね処理
        const newLikeArticle = findArticleById(currentArticles, articleId); //他タブから記事情報を取得

        if (newLikeArticle) {
          // 記事情報が他タブから取得できた場合、いいね
          newLikeArticle.likes.find((like) => like.userId === userInfo.id) ??
            newLikeArticle.likes.push({
              id: Date.now(),
              userId: userInfo.id!,
              articleId: articleId,
            });
          updatedArticles[category] = [
            ...currentArticles[category],
            newLikeArticle,
          ];
        } else {
          updatedArticles[category] = [...currentArticles[category]];
        }
      }
    } else {
      // 他のカテゴリの処理
      updatedArticles[category] = currentArticles[category].map((article) => {
        // そのタブの記事リストに該当記事があった場合
        if (article.id === articleId) {
          const updatedArticle = { ...article };

          const currentLikeIndex = updatedArticle.likes.findIndex(
            (like) => like.userId === userInfo.id
          ); //現在のいいねリストの中にユーザーが含まれているかどうか＝すでにその記事にいいねしているかどうか

          if (newLikeState) {
            //このアクションがいいね登録起因の場合
            if (currentLikeIndex === -1) {
              // いいねリストにそのユーザーがいない場合、ユーザーのいいねをpush
              updatedArticle.likes.push({
                id: Date.now(),
                userId: userInfo.id!,
                articleId: articleId,
              });
            } else {
              // 既にそのユーザーによるいいね処理が行われている場合は何もしない
            }
          } else {
            //このアクションがいいね削除起因の場合
            if (currentLikeIndex > -1) {
              //いいねリストにユーザーが含まれているので削除する
              updatedArticle.likes = updatedArticle.likes.filter(
                (like) => like.userId !== userInfo.id
              );
            }
          }

          return updatedArticle;
        }
        return article;
      });
    }
  });

  return updatedArticles;
};
