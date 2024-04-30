import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { LikesInfo, PostInfo } from "../lib/type/PostType";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { registerLike } from "../lib/database/Post";

export const useLikeState = (post: PostInfo) => {
  const [userInfojotai] = useAtom(userInfoAtom); // ユーザー情報
  const [likeState, setLikeState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const checkLikeState = () => {
      // console.log("checkLikeState");
      // ログインユーザーのIDがlikes配列に存在するかどうかを確認
      const userLiked = post.likes.some(
        (like: LikesInfo) => like.userId === userInfojotai.userInfo?.id
      );
      // console.log(post.id, post.likes, userLiked);
      // チェックに基づいてlikeStateを更新
      setLikeState(userLiked);
    };

    checkLikeState(); // コンポーネントがマウントされた時に関数を呼び出す
    setLikeCount(post.likes.length);
  }, [post.likes]);

  const registerLikeState = async () => {
    console.log("registerLikeState", {
      likeState,
    });

    //サーバーにlikeの情報を登録する
    const token = userInfojotai.authtoken;
    let newLikeCount = await registerLike(
      post.id,
      userInfojotai.userInfo?.id!,
      !likeState,
      token
    );
    console.log(newLikeCount);
    if (newLikeCount === null) {
      newLikeCount = 0;
    }
    setLikeCount(newLikeCount);
  };

  return {
    likeState,
    likeCount,
    registerLikeState,
    setLikeState,
    setLikeCount,
  };
};
