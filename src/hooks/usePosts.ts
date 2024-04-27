import { useState } from "react";
import {
  getFollowingsPostList,
  getTrendPostList,
  registerPostAPI,
} from "../lib/database/Post";
import { useAtom } from "jotai";
import { userInfoAtom } from "../lib/jotai/atoms/user";
import { PostInfo } from "../lib/type/PostType";
const testPosts: PostInfo[] = [
  {
    id: "1",
    username: "testuser1",
    text: "testposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    username: "testuser2",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createdAt: new Date("2024-04-016T12:34:56Z"),
    updatedAt: new Date("2024-04-019T12:34:56Z"),
  },
  {
    id: "3",
    username: "testuser3",
    text: "testposttestposttestposttestposttestposttestpost",
    avatar: "/assets/default_profile_400x400.png",
    createdAt: new Date("2024-04-017T12:34:56Z"),
    updatedAt: new Date("2024-04-019T12:34:56Z"),
  },
];

const usePosts = (tabName: string) => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [postList, setPostList] = useState<PostInfo[]>([]);
  const [hasMore, setHasMore] = useState(true); //再読み込み判定

  const sleep = (sec: number) =>
    new Promise((resolve) => setTimeout(resolve, sec * 1000)); // ← ③

  const registerPost = async (text: string, img: File | null) => {
    try {
      setLoading(true);
      console.log({ userInfoJotai });

      if (!text || text.length === 0 || text.length > 200) {
        throw new Error("text should be less than 200");
      }
      const testImg = "/assets/food_fruit_sandwich_ichigo.png";
      const newPost = await registerPostAPI(userInfoJotai.id!, testImg, text);
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

  const setNextPost = async (page: number) => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = userInfoJotai.id;
      if (!userId) {
        throw new Error("userId couldn't be extracted from storage.");
      }
      await sleep(1.0);
      let newPosts: any[] | null;
      if (tabName === "trend") {
        newPosts = await getTrendPostList(token, 20, page);
      } else {
        newPosts = await getFollowingsPostList(token, userId, 20, page);
      }
      console.log(newPosts);
      if (!newPosts) {
        newPosts = [];
      }

      setHasMore(newPosts.length > 0);

      setPostList([...postList, ...newPosts]);
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
