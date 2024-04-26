import { useEffect, useState } from "react";
import { getPostList, registerPostAPI } from "../lib/database/Post";
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

const usePosts = () => {
  const [userInfoJotai, setuserInfoJotai] = useAtom(userInfoAtom); //ユーザー情報のグローバルステート

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [posts, setPosts] = useState<PostInfo[]>([]);
  useEffect(() => {
    console.log("usePosts _ useEffect");
    setRecentPosts();
  }, []);

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
      setPosts([newPost, ...posts]);
      console.log({ posts });
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addNewPost = (newPost: PostInfo) => {
    setPosts([newPost, ...posts]);
  };
  const setRecentPosts = async () => {
    try {
      const recentPosts = await getPostList();
      console.log(recentPosts);
      if (recentPosts) {
        setPosts(recentPosts);
      }
    } catch (error: any) {
      setErrorMsg(error.message);
      console.log(error);
    }
  };

  return {
    addNewPost,
    setRecentPosts,
    loading,
    errorMsg,
    registerPost,
    posts,
  };
};

export default usePosts;
