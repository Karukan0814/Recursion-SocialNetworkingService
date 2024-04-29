import { useEffect, useState } from "react";
import {
  getFollowingsPostList,
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

  const fetchInitialPosts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = userInfoJotai.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      let newPosts: any[] | null;
      let page = 1;
      if (tabName === PostType.trend) {
        newPosts = await getTrendPostList(token, 20, page);
      } else if (tabName === PostType.followings) {
        newPosts = await getFollowingsPostList(token, userId, 20, page);
      } else if (tabName === PostType.detail) {
        //TODO 次のリプライを取得する処理
        console.log({ token, userId, page, parentId });
        newPosts = await getReplyPostList(token, userId, 20, page, parentId);
      } else {
        newPosts = [];
      }
      console.log(newPosts);
      if (!newPosts) {
        newPosts = [];
      }

      setPostList(newPosts);
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };
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
        userInfoJotai.id!,
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
      const token = localStorage.getItem("authToken");
      const userId = userInfoJotai.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      let newPosts: any[] | null;
      if (tabName === PostType.trend) {
        newPosts = await getTrendPostList(token, 20, page);
      } else if (tabName === PostType.followings) {
        newPosts = await getFollowingsPostList(token, userId, 20, page);
      } else if (tabName === PostType.detail) {
        //TODO 次のリプライを取得する処理
        console.log({ token, userId, page, replyToId });
        newPosts = await getReplyPostList(token, userId, 20, page, replyToId);
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
