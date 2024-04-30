import { useEffect, useState } from "react";
import {
  getFollowingsPostList,
  getLikeListByUserId,
  getPostListByUserId,
  getReplyListByUserId,
  getReplyPostList,
  getTrendPostList,
  registerPostAPI,
} from "../lib/database/Post";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostInfo, PostType } from "../lib/type/PostType";

const usePosts = (tabName: PostType, parentId?: number) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [postList, setPostList] = useState<PostInfo[]>([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定
  useEffect(() => {
    console.log("useEffect___usePosts");
    setNextPost(1, parentId);
  }, [parentId]);
  const registerPost = async (
    text: string,
    img: File | null,
    replyToId?: number
  ) => {
    try {
      setLoading(true);
      console.log({ replyToId });

      if (!text || text.length === 0 || text.length > 200) {
        throw new Error("text should be less than 200");
      }
      const testImg = "/assets/food_fruit_sandwich_ichigo.png";
      const newPost = await registerPostAPI(
        userInfoJotai.userInfo?.id!,
        userInfoJotai.authtoken!,
        testImg,
        text,
        replyToId
      );
      console.log(newPost);
      if (!newPost) {
        throw new Error("Something wrong with registering new post");
      }

      setPostList([newPost, ...postList]);
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setNextPost = async (page: number, replyToId?: number) => {
    try {
      const token = userInfoJotai.authtoken;
      const userId = userInfoJotai.userInfo?.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      let newPosts: any[] | null;
      if (tabName === PostType.trend) {
        // トレンドのポストリストの取得
        newPosts = await getTrendPostList(token, 20, page);
      } else if (tabName === PostType.followings) {
        // フォローしているユーザーのポストリストの取得

        newPosts = await getFollowingsPostList(token, userId, 20, page);
      } else if (tabName === PostType.detail) {
        // 選択したポストのリプライポストリストの取得

        newPosts = await getReplyPostList(token, userId, 20, page, replyToId);
      } else if (tabName === PostType.self) {
        //ユーザーの親ポストリストの取得

        console.log("getPostListByUserId", { token, userId, page, replyToId });
        newPosts = await getPostListByUserId(token, userId, 20, page);
      } else if (tabName === PostType.selfReplies) {
        //ユーザーのリプライポストリストの取得

        console.log("getReplyListByUserId", { token, userId, page });
        newPosts = await getReplyListByUserId(token, userId, 20, page);
      } else if (tabName === PostType.likes) {
        //ユーザーがLikeしたポストリストの取得

        console.log("getLikeListByUserId", { token, userId, page });
        newPosts = await getLikeListByUserId(token, userId, 20, page);
      } else {
        newPosts = [];
      }
      console.log(newPosts);
      if (!newPosts) {
        newPosts = [];
      }

      setHasMore(newPosts.length > 0);
      if (page > 1) {
        setPostList([...postList, ...newPosts]);
      } else {
        setPostList(newPosts);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  return {
    loading,
    errorMsg,
    registerPost,
    postList,
    setNextPost,
    hasMore,
  };
};

export default usePosts;
